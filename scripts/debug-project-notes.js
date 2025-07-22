const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")

// Define the content directory
const contentDir = path.join(process.cwd(), "content")
const projectsDir = path.join(contentDir, "projects")

// Function to check project notes
function checkProjectNotes() {
  console.log("Checking project notes...")

  if (!fs.existsSync(projectsDir)) {
    console.error("Projects directory does not exist!")
    return
  }

  // Get all items in the projects directory
  const items = fs.readdirSync(projectsDir)

  // Process each item
  items.forEach((item) => {
    const itemPath = path.join(projectsDir, item)
    const stats = fs.statSync(itemPath)

    if (stats.isDirectory()) {
      // This is a project subfolder
      console.log(`\nProject subfolder: ${item}`)

      // Check if there's a corresponding main project file
      const mainProjectFile = `${item}.md`
      const mainProjectPath = path.join(projectsDir, mainProjectFile)

      if (fs.existsSync(mainProjectPath)) {
        console.log(`  Main project file exists: ${mainProjectFile}`)

        // Read the main project file to check for links to notes
        const mainProjectContent = fs.readFileSync(mainProjectPath, "utf8")
        const { content } = matter(mainProjectContent)

        // Extract links to project notes
        const linkRegex = /\[([^\]]+)\]$$\/projects\/([^)]+)$$/g
        const links = []
        let match

        while ((match = linkRegex.exec(content)) !== null) {
          links.push({
            text: match[1],
            path: match[2],
          })
        }

        if (links.length > 0) {
          console.log(`  Found ${links.length} links to project notes:`)
          links.forEach((link) => {
            console.log(`    - [${link.text}] -> /projects/${link.path}`)
          })
        } else {
          console.log(`  No links to project notes found in main project file`)
        }
      } else {
        console.warn(`  Warning: No main project file found for subfolder ${item}`)
      }

      // Check notes in the subfolder
      const noteFiles = fs.readdirSync(itemPath).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))

      if (noteFiles.length === 0) {
        console.warn(`  Warning: No note files found in subfolder ${item}`)
      } else {
        console.log(`  Found ${noteFiles.length} note files:`)

        noteFiles.forEach((noteFile) => {
          const noteSlug = noteFile.replace(/\.(md|mdx)$/, "")
          const notePath = path.join(itemPath, noteFile)

          try {
            const noteContent = fs.readFileSync(notePath, "utf8")
            const { data } = matter(noteContent)

            console.log(`    - ${noteFile} (slug: ${noteSlug}, title: ${data.title || "No title"})`)
          } catch (error) {
            console.error(`    - Error reading ${noteFile}: ${error.message}`)
          }
        })
      }
    } else if (item.endsWith(".md") || item.endsWith(".mdx")) {
      // This is a main project file
      const projectSlug = item.replace(/\.(md|mdx)$/, "")

      // Check if there's a corresponding subfolder
      const subfolderPath = path.join(projectsDir, projectSlug)

      if (fs.existsSync(subfolderPath) && fs.statSync(subfolderPath).isDirectory()) {
        // Already processed with the directory
      } else {
        console.log(`\nMain project file without subfolder: ${item} (slug: ${projectSlug})`)
      }
    }
  })

  console.log("\nProject notes check complete!")
}

// Run the check
checkProjectNotes()
