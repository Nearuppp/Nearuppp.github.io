import { getMarkdownFiles, type MarkdownFile } from "./markdown"

// Get all unique tags from a specific content directory
export function getAllTags(directory: string): string[] {
  try {
    const files = getMarkdownFiles(directory)
    const allTags = files.flatMap((file) => file.frontMatter.tags || [])
    return Array.from(new Set(allTags)).sort()
  } catch (error) {
    console.error(`Error getting tags for ${directory}:`, error)
    return []
  }
}

// Get all content with a specific tag
export function getContentByTag(directory: string, tag: string): MarkdownFile[] {
  try {
    const files = getMarkdownFiles(directory, false) // Include all files, not just main projects
    return files.filter((file) => file.frontMatter.tags && file.frontMatter.tags.includes(tag))
  } catch (error) {
    console.error(`Error getting content by tag ${tag} for ${directory}:`, error)
    return []
  }
}

// Get all unique tags across all content directories
export function getAllUniqueTags(): string[] {
  try {
    const projectTags = getAllTags("projects")
    const knowledgeTags = getAllTags("knowledge-hub")
    const allTags = [...projectTags, ...knowledgeTags]
    return Array.from(new Set(allTags)).sort()
  } catch (error) {
    console.error("Error getting all unique tags:", error)
    return []
  }
}

// Get all content with a specific tag across all directories
export function getAllContentByTag(tag: string): {
  projects: MarkdownFile[]
  knowledgeHub: MarkdownFile[]
} {
  try {
    const projects = getContentByTag("projects", tag)
    const knowledgeHub = getContentByTag("knowledge-hub", tag)
    return { projects, knowledgeHub }
  } catch (error) {
    console.error(`Error getting all content by tag ${tag}:`, error)
    return { projects: [], knowledgeHub: [] }
  }
}
