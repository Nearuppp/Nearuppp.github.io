const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")

// Check if file path is provided
if (process.argv.length < 3) {
  console.error("Please provide a file path to your Obsidian markdown file")
  console.error("Usage: node scripts/add-obsidian-file.js path/to/your/file.md [projects|knowledge-hub]")
  process.exit(1)
}

// Get file path and type
const filePath = process.argv[2]
const type = process.argv[3] || "knowledge-hub" // Default to knowledge-hub

if (!["projects", "knowledge-hub"].includes(type)) {
  console.error('Type must be either "projects" or "knowledge-hub"')
  process.exit(1)
}

// Check if file exists
if (!fs.existsSync(filePath)) {
  console.error(`File ${filePath} does not exist`)
  process.exit(1)
}

// Read file content
const fileContent = fs.readFileSync(filePath, "utf8")

// Parse frontmatter
let { data, content } = matter(fileContent)

// If no frontmatter, create a basic one
if (Object.keys(data).length === 0) {
  const fileName = path.basename(filePath, path.extname(filePath))
  data = {
    title: fileName.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    date: new Date().toISOString().split("T")[0],
    excerpt: "Add a brief description here",
    tags: ["Tag1", "Tag2"],
    category: "Uncategorized",
  }

  if (type === "projects") {
    data.featured = false
    data.image = "/placeholder.svg?height=400&width=600"
  }
}

// Create new file content with frontmatter
const newContent = matter.stringify(content, data)

// Get destination path
const fileName = path.basename(filePath, path.extname(filePath))
const destPath = path.join(process.cwd(), "content", type, `${fileName}.md`)

// Write to destination
fs.writeFileSync(destPath, newContent)

console.log(`File added to ${type}: ${destPath}`)
