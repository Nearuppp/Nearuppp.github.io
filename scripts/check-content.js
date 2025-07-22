const fs = require("fs")
const path = require("path")

// Define the content directory
const contentDirectory = path.join(process.cwd(), "content")

// Function to check if a directory exists
function checkDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.error(`Directory does not exist: ${dirPath}`)
    return false
  }
  return true
}

// Function to check if a file exists
function checkFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`File does not exist: ${filePath}`)
    return false
  }
  return true
}

// Function to check the content structure
function checkContentStructure() {
  console.log("Checking content structure...")

  // Check if content directory exists
  if (!checkDirectory(contentDirectory)) {
    console.error("Content directory does not exist. Run 'npm run setup-content' first.")
    return
  }

  // Check projects directory
  const projectsDir = path.join(contentDirectory, "projects")
  if (!checkDirectory(projectsDir)) {
    console.error("Projects directory does not exist. Run 'npm run setup-content' first.")
    return
  }

  // Check knowledge hub directory
  const knowledgeHubDir = path.join(contentDirectory, "knowledge-hub")
  if (!checkDirectory(knowledgeHubDir)) {
    console.error("Knowledge hub directory does not exist. Run 'npm run setup-content' first.")
    return
  }

  // Check projects
  console.log("\nChecking projects...")
  const projectFiles = fs.readdirSync(projectsDir)

  projectFiles.forEach((file) => {
    const filePath = path.join(projectsDir, file)
    const stats = fs.statSync(filePath)

    if (stats.isDirectory()) {
      console.log(`\nProject subfolder: ${file}`)
      const subFiles = fs.readdirSync(filePath)

      if (subFiles.length === 0) {
        console.warn(`  Warning: Empty subfolder: ${file}`)
      } else {
        subFiles.forEach((subFile) => {
          if (subFile.endsWith(".md") || subFile.endsWith(".mdx")) {
            console.log(`  Subfolder file: ${subFile}`)
          }
        })
      }
    } else if (file.endsWith(".md") || file.endsWith(".mdx")) {
      console.log(`Project file: ${file}`)
    }
  })

  // Check knowledge hub
  console.log("\nChecking knowledge hub...")
  const knowledgeHubFiles = fs.readdirSync(knowledgeHubDir)

  knowledgeHubFiles.forEach((file) => {
    if (file.endsWith(".md") || file.endsWith(".mdx")) {
      console.log(`Knowledge hub file: ${file}`)
    }
  })

  console.log("\nContent structure check complete!")
}

// Run the check
checkContentStructure()
