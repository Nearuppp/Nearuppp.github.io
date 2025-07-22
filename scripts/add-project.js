const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")
const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Function to prompt for input
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

// Main function
async function main() {
  console.log("Create a new project with related notes")
  console.log("--------------------------------------")

  // Get project details
  const projectSlug = await prompt("Project slug (kebab-case): ")
  const projectTitle = await prompt("Project title: ")
  const projectExcerpt = await prompt("Project excerpt: ")
  const projectTags = await prompt("Project tags (comma-separated): ")
  const projectCategory = await prompt("Project category: ")
  const projectFeatured = (await prompt("Is this a featured project? (y/n): ")).toLowerCase() === "y"

  // Create project content
  const projectContent = `---
title: "${projectTitle}"
date: "${new Date().toISOString().split("T")[0]}"
excerpt: "${projectExcerpt}"
tags: [${projectTags
    .split(",")
    .map((tag) => `"${tag.trim()}"`)
    .join(", ")}]
category: "${projectCategory}"
featured: ${projectFeatured}
image: "/placeholder.svg?height=400&width=600"
isMainProject: true
---

# ${projectTitle}

${projectExcerpt}

## Overview

Add your project overview here.

## Features

- Feature 1
- Feature 2
- Feature 3

## Implementation

Add implementation details here.

## Pour en savoir plus

Pour approfondir ce sujet, consultez les notes détaillées suivantes:

`

  // Create project directory
  const contentDir = path.join(process.cwd(), "content")
  const projectsDir = path.join(contentDir, "projects")
  const projectDir = path.join(projectsDir, projectSlug)

  if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true })
  }

  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir)
  }

  // Write main project file
  fs.writeFileSync(path.join(projectsDir, `${projectSlug}.md`), projectContent)
  console.log(`Created main project file: ${projectSlug}.md`)

  // Ask for related notes
  let addMoreNotes = true
  const relatedNotes = []

  while (addMoreNotes) {
    console.log("\nAdd a related note:")
    const noteSlug = await prompt("Note slug (kebab-case): ")
    const noteTitle = await prompt("Note title: ")
    const noteExcerpt = await prompt("Note excerpt: ")

    // Create note content
    const noteContent = `---
title: "${noteTitle}"
date: "${new Date().toISOString().split("T")[0]}"
excerpt: "${noteExcerpt}"
tags: [${projectTags
      .split(",")
      .map((tag) => `"${tag.trim()}"`)
      .join(", ")}]
category: "${projectCategory}"
---

# ${noteTitle}

${noteExcerpt}

## Content

Add your note content here.
`

    // Write note file
    fs.writeFileSync(path.join(projectDir, `${noteSlug}.md`), noteContent)
    console.log(`Created related note: ${noteSlug}.md`)

    relatedNotes.push({ slug: noteSlug, title: noteTitle })

    const addAnother = await prompt("Add another related note? (y/n): ")
    addMoreNotes = addAnother.toLowerCase() === "y"
  }

  // Update main project file with links to related notes
  if (relatedNotes.length > 0) {
    const mainProjectPath = path.join(projectsDir, `${projectSlug}.md`)
    let mainProjectContent = fs.readFileSync(mainProjectPath, "utf8")

    // Add links to related notes with trailing slashes
    const linksSection = relatedNotes
      .map((note) => `- [${note.title}](/projects/${projectSlug}/${note.slug}/)`)
      .join("\n")

    mainProjectContent = mainProjectContent.replace(
      "Pour approfondir ce sujet, consultez les notes détaillées suivantes:",
      "Pour approfondir ce sujet, consultez les notes détaillées suivantes:\n\n" + linksSection,
    )

    fs.writeFileSync(mainProjectPath, mainProjectContent)
    console.log("\nUpdated main project file with links to related notes")
  }

  console.log("\nProject creation complete!")
  rl.close()
}

main().catch(console.error)
