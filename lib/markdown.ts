import fs from "fs"
import path from "path"
import matter from "gray-matter"

// Define the content directory where markdown files will be stored
const contentDirectory = path.join(process.cwd(), "content")

// Define interfaces for our markdown content
export interface MarkdownFile {
  slug: string
  frontMatter: {
    title: string
    date: string
    excerpt?: string
    tags?: string[]
    category?: string
    featured?: boolean
    image?: string
    isMainProject?: boolean
    projectSlug?: string
    [key: string]: any
  }
  content: string
}

// Function to safely check if we're in a build environment
function isBuildTime() {
  return typeof window === "undefined" && process.env.NODE_ENV !== "development"
}

// Function to get all markdown files from a specific directory
export function getMarkdownFiles(directory: string, onlyMainProjects = false): MarkdownFile[] {
  // Return empty array during build if content doesn't exist
  if (isBuildTime()) {
    try {
      const fullPath = path.join(contentDirectory, directory)
      if (!fs.existsSync(fullPath)) {
        return []
      }
    } catch (error) {
      return []
    }
  }

  const fullPath = path.join(contentDirectory, directory)

  // Check if directory exists
  if (!fs.existsSync(fullPath)) {
    console.warn(`Directory ${fullPath} does not exist.`)
    return []
  }

  // Get all files in the directory
  let fileNames: string[] = []
  try {
    fileNames = fs.readdirSync(fullPath)
  } catch (error) {
    console.error(`Error reading directory ${fullPath}:`, error)
    return []
  }

  // Array to store all markdown files
  let allFiles: MarkdownFile[] = []

  // Process files in the current directory
  fileNames.forEach((fileName) => {
    try {
      const filePath = path.join(fullPath, fileName)
      const stats = fs.statSync(filePath)

      if (stats.isDirectory()) {
        // This is a project subfolder - process it if we're looking for all files
        if (!onlyMainProjects) {
          const projectSlug = fileName
          let subFiles: string[] = []

          try {
            subFiles = fs.readdirSync(filePath).filter((subFile) => /\.(md|mdx)$/.test(subFile))
          } catch (error) {
            console.error(`Error reading subdirectory ${filePath}:`, error)
            return
          }

          const processedSubFiles = subFiles
            .map((subFile) => {
              try {
                const subFilePath = path.join(filePath, subFile)
                const fileContents = fs.readFileSync(subFilePath, "utf8")
                const { data, content } = matter(fileContents)

                // Get the slug from the filename without the extension
                const slug = `${projectSlug}/${subFile.replace(/\.(md|mdx)$/, "")}`

                return {
                  slug,
                  frontMatter: {
                    title: data.title || slug,
                    date: data.date || new Date().toISOString().split("T")[0],
                    excerpt: data.excerpt || "",
                    tags: data.tags || [],
                    category: data.category || "Uncategorized",
                    featured: data.featured || false,
                    image: data.image || "/placeholder.svg?height=400&width=600",
                    isMainProject: false,
                    projectSlug,
                    ...data,
                  },
                  content,
                }
              } catch (error) {
                console.error(`Error processing subfile ${subFile}:`, error)
                return null
              }
            })
            .filter(Boolean) as MarkdownFile[]

          allFiles = [...allFiles, ...processedSubFiles]
        }
      } else if (/\.(md|mdx)$/.test(fileName)) {
        // This is a markdown file
        try {
          const fileContents = fs.readFileSync(filePath, "utf8")
          const { data, content } = matter(fileContents)

          // Get the slug from the filename without the extension
          const slug = fileName.replace(/\.(md|mdx)$/, "")

          // If we're only looking for main projects, check the isMainProject flag
          const isMainProject = data.isMainProject !== undefined ? data.isMainProject : true

          if (!onlyMainProjects || isMainProject) {
            allFiles.push({
              slug,
              frontMatter: {
                title: data.title || slug,
                date: data.date || new Date().toISOString().split("T")[0],
                excerpt: data.excerpt || "",
                tags: data.tags || [],
                category: data.category || "Uncategorized",
                featured: data.featured || false,
                image: data.image || "/placeholder.svg?height=400&width=600",
                isMainProject,
                ...data,
              },
              content,
            })
          }
        } catch (error) {
          console.error(`Error processing file ${fileName}:`, error)
        }
      }
    } catch (error) {
      console.error(`Error processing item ${fileName}:`, error)
    }
  })

  return allFiles
}

// Function to get a specific markdown file by slug
export function getMarkdownFileBySlug(directory: string, slug: string): MarkdownFile | null {
  try {
    const fullPath = path.join(contentDirectory, directory)

    // Check if directory exists
    if (!fs.existsSync(fullPath)) {
      console.error(`Directory ${fullPath} does not exist`)
      return null
    }

    // Check if the slug contains a slash, indicating it's in a subfolder
    if (slug.includes("/")) {
      const parts = slug.split("/")
      const projectSlug = parts[0]
      const noteSlug = parts.slice(1).join("/") // Handle multi-level paths if needed

      const projectPath = path.join(fullPath, projectSlug)

      if (!fs.existsSync(projectPath)) {
        console.error(`Project directory ${projectPath} does not exist`)
        return null
      }

      // Try different extensions (.md, .mdx)
      const extensions = [".md", ".mdx"]
      let filePath = null
      let fileExists = false

      for (const ext of extensions) {
        const testPath = path.join(projectPath, `${noteSlug}${ext}`)

        if (fs.existsSync(testPath) && fs.statSync(testPath).isFile()) {
          filePath = testPath
          fileExists = true
          break
        }
      }

      if (!fileExists || !filePath) {
        console.error(`Note file with slug ${noteSlug} not found in ${projectPath}`)
        return null
      }

      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        frontMatter: {
          title: data.title || noteSlug,
          date: data.date || new Date().toISOString().split("T")[0],
          excerpt: data.excerpt || "",
          tags: data.tags || [],
          category: data.category || "Uncategorized",
          featured: data.featured || false,
          image: data.image || "/placeholder.svg?height=400&width=600",
          isMainProject: false,
          projectSlug,
          ...data,
        },
        content,
      }
    } else {
      // It's a top-level file - try different extensions
      const extensions = [".md", ".mdx"]
      let filePath = null
      let fileExists = false

      for (const ext of extensions) {
        const testPath = path.join(fullPath, `${slug}${ext}`)
        if (fs.existsSync(testPath) && fs.statSync(testPath).isFile()) {
          filePath = testPath
          fileExists = true
          break
        }
      }

      if (!fileExists || !filePath) {
        console.error(`File with slug ${slug} not found in ${fullPath}`)
        return null
      }

      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        frontMatter: {
          title: data.title || slug,
          date: data.date || new Date().toISOString().split("T")[0],
          excerpt: data.excerpt || "",
          tags: data.tags || [],
          category: data.category || "Uncategorized",
          featured: data.featured || false,
          image: data.image || "/placeholder.svg?height=400&width=600",
          isMainProject: data.isMainProject !== undefined ? data.isMainProject : true,
          ...data,
        },
        content,
      }
    }
  } catch (error) {
    console.error(`Error in getMarkdownFileBySlug for ${directory}/${slug}:`, error)
    return null
  }
}

// Function to get all slugs for a specific directory
export function getAllSlugs(directory: string, includeSubfolders = true): string[] {
  try {
    const fullPath = path.join(contentDirectory, directory)

    // Check if directory exists
    if (!fs.existsSync(fullPath)) {
      console.warn(`Directory ${fullPath} does not exist for getAllSlugs`)
      return []
    }

    // Get all files in the directory
    const fileNames = fs.readdirSync(fullPath)

    // Array to store all slugs
    let allSlugs: string[] = []

    // Process files in the current directory
    fileNames.forEach((fileName) => {
      try {
        const filePath = path.join(fullPath, fileName)
        const stats = fs.statSync(filePath)

        if (stats.isDirectory() && includeSubfolders) {
          // This is a project subfolder
          const projectSlug = fileName
          const projectPath = path.join(fullPath, projectSlug)

          if (fs.existsSync(projectPath)) {
            const subFiles = fs
              .readdirSync(projectPath)
              .filter((subFile) => /\.(md|mdx)$/.test(subFile))
              .map((subFile) => `${projectSlug}/${subFile.replace(/\.(md|mdx)$/, "")}`)

            allSlugs = [...allSlugs, ...subFiles]
          }
        } else if (/\.(md|mdx)$/.test(fileName)) {
          // This is a markdown file
          allSlugs.push(fileName.replace(/\.(md|mdx)$/, ""))
        }
      } catch (error) {
        console.error(`Error processing ${fileName} in getAllSlugs:`, error)
      }
    })

    return allSlugs
  } catch (error) {
    console.error(`Error in getAllSlugs for ${directory}:`, error)
    return []
  }
}

// Function to get related notes for a project
export function getRelatedNotes(directory: string, projectSlug: string): MarkdownFile[] {
  try {
    const fullPath = path.join(contentDirectory, directory, projectSlug)

    if (!fs.existsSync(fullPath)) {
      return []
    }

    const fileNames = fs.readdirSync(fullPath)

    return fileNames
      .filter((fileName) => /\.(md|mdx)$/.test(fileName))
      .map((fileName) => {
        try {
          const noteSlug = fileName.replace(/\.(md|mdx)$/, "")
          const filePath = path.join(fullPath, fileName)
          const fileContents = fs.readFileSync(filePath, "utf8")
          const { data, content } = matter(fileContents)
          return {
            slug: `${projectSlug}/${noteSlug}`,
            frontMatter: {
              title: data.title || noteSlug,
              date: data.date || new Date().toISOString().split("T")[0],
              excerpt: data.excerpt || "",
              tags: data.tags || [],
              category: data.category || "Uncategorized",
              featured: data.featured || false,
              image: data.image || "/placeholder.svg?height=400&width=600",
              isMainProject: false,
              projectSlug,
              ...data,
            },
            content,
          }
        } catch (error) {
          console.error(`Error processing related note ${fileName}:`, error)
          return null
        }
      })
      .filter(Boolean) as MarkdownFile[]
  } catch (error) {
    console.error(`Error in getRelatedNotes for ${directory}/${projectSlug}:`, error)
    return []
  }
}

// Function to process markdown content to fix internal links and ensure proper markdown formatting
export function processMarkdownContent(content: string, basePath = ""): string {
  // Step 1: Fix internal links with the format [[link text]](/path/to/page)
  let processedContent = content.replace(/\[\[([^\]]+)\]\]$$([^)]+)$$/g, (match, linkText, path) => {
    const normalizedPath = path.endsWith("/") ? path : `${path}/`
    return `[${linkText}](${basePath}${normalizedPath})`
  })

  // Step 2: Fix Obsidian-style internal links with the format [[link text]]
  processedContent = processedContent.replace(/\[\[([^\]]+)\]\]/g, (match, linkText) => {
    // Convert the link text to a slug format
    const slug = linkText.toLowerCase().replace(/\s+/g, "-")
    return `[${linkText}](/knowledge-hub/${slug}/)`
  })

  // Step 3: Fix image references with the format ![[image name]]
  processedContent = processedContent.replace(/!\[\[([^\]]+)\]\]/g, (match, imageName) => {
    return `![${imageName}](${basePath}/images/${imageName})`
  })

  // Step 4: Ensure code blocks are properly formatted
  processedContent = processedContent.replace(/```(\w+)\n([\s\S]*?)```/g, (match, language, code) => {
    return `\`\`\`${language}\n${code}\`\`\``
  })

  // Step 5: Fix links with the format [link text]$$/path/to/page$$
  processedContent = processedContent.replace(/\[([^\]]+)\]\$\$\/([^)]+)\$\$/g, (match, linkText, path) => {
    const normalizedPath = path.endsWith("/") ? path : `${path}/`
    return `[${linkText}](${basePath}/${normalizedPath})`
  })

  return processedContent
}
