import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import remarkGfm from "remark-gfm"

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
    [key: string]: any
  }
  content: string
  mdxSource?: any
}

// Function to get all markdown files from a specific directory
export async function getMarkdownFiles(directory: string): Promise<MarkdownFile[]> {
  const fullPath = path.join(contentDirectory, directory)

  // Check if directory exists
  if (!fs.existsSync(fullPath)) {
    console.warn(`Directory ${fullPath} does not exist. Creating it...`)
    try {
      fs.mkdirSync(fullPath, { recursive: true })
    } catch (error) {
      console.error(`Failed to create directory ${fullPath}:`, error)
    }
    return []
  }

  // Get all files in the directory
  const fileNames = fs.readdirSync(fullPath)

  // Filter for markdown files and parse them
  const markdownFiles = fileNames.filter((fileName) => /\.(md|mdx)$/.test(fileName))

  const files = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const filePath = path.join(fullPath, fileName)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContents)

      // Get the slug from the filename without the extension
      const slug = fileName.replace(/\.(md|mdx)$/, "")

      // Serialize MDX content
      const mdxSource = await serialize(content, {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [],
        },
        scope: data,
      })

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
          ...data,
        },
        content,
        mdxSource,
      }
    }),
  )

  return files
}

// Function to get a specific markdown file by slug
export async function getMarkdownFileBySlug(directory: string, slug: string): Promise<MarkdownFile | null> {
  const fullPath = path.join(contentDirectory, directory)

  // Check if directory exists
  if (!fs.existsSync(fullPath)) {
    return null
  }

  // Get all files in the directory
  const fileNames = fs.readdirSync(fullPath)

  // Find the file with the matching slug
  const fileName = fileNames.find((name) => name.replace(/\.(md|mdx)$/, "") === slug)

  if (!fileName) {
    return null
  }

  const filePath = path.join(fullPath, fileName)
  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)

  // Serialize MDX content
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
    },
    scope: data,
  })

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
      ...data,
    },
    content,
    mdxSource,
  }
}
