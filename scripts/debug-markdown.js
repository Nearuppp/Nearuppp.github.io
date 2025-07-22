const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")

// Define the content directory
const contentDir = path.join(process.cwd(), "content")

// Function to debug markdown content
function debugMarkdown(filePath) {
  console.log(`Debugging markdown file: ${filePath}`)

  if (!fs.existsSync(filePath)) {
    console.error(`File does not exist: ${filePath}`)
    return
  }

  try {
    // Read the file content
    const fileContent = fs.readFileSync(filePath, "utf8")

    // Parse frontmatter
    const { data, content } = matter(fileContent)

    console.log("\nFrontmatter:")
    console.log(JSON.stringify(data, null, 2))

    console.log("\nContent Preview (first 500 chars):")
    console.log(content.substring(0, 500) + "...")

    // Check for common markdown patterns
    console.log("\nMarkdown Pattern Analysis:")

    // Check for headers
    const headers = content.match(/^#+\s+.+$/gm) || []
    console.log(`- Headers: ${headers.length} found`)

    // Check for links
    const links = content.match(/\[([^\]]+)\]$$([^)]+)$$/g) || []
    console.log(`- Standard links: ${links.length} found`)

    // Check for Obsidian-style links
    const obsidianLinks = content.match(/\[\[([^\]]+)\]\]/g) || []
    console.log(`- Obsidian-style links: ${obsidianLinks.length} found`)

    // Check for images
    const images = content.match(/!\[([^\]]*)\]$$([^)]+)$$/g) || []
    console.log(`- Standard images: ${images.length} found`)

    // Check for Obsidian-style images
    const obsidianImages = content.match(/!\[\[([^\]]+)\]\]/g) || []
    console.log(`- Obsidian-style images: ${obsidianImages.length} found`)

    // Check for code blocks
    const codeBlocks = content.match(/```[\s\S]*?```/g) || []
    console.log(`- Code blocks: ${codeBlocks.length} found`)

    // Check for custom link format
    const customLinks = content.match(/\[([^\]]+)\]\$\$\/([^)]+)\$\$/g) || []
    console.log(`- Custom format links: ${customLinks.length} found`)

    console.log("\nDebug complete!")
  } catch (error) {
    console.error(`Error debugging markdown file: ${error.message}`)
  }
}

// Check if a file path is provided
if (process.argv.length < 3) {
  console.error("Please provide a file path to debug")
  console.error("Usage: node scripts/debug-markdown.js path/to/your/file.md")
  process.exit(1)
}

// Get file path and run debug
const filePath = process.argv[2]
debugMarkdown(filePath)
