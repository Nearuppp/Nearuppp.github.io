import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import KnowledgeHubSection from "@/components/knowledge-hub-section"
import { KnowledgeHubProvider } from "@/components/knowledge-hub-provider"
import { getMarkdownFiles } from "@/lib/markdown"

export const metadata: Metadata = {
  title: "Knowledge Hub | Matthieu GUYOT",
  description: "Explore Matthieu GUYOT's knowledge base and Obsidian notes",
}

export default function KnowledgeHubPage() {
  // Get knowledge hub data at build time
  let notesData: any[] = []

  try {
    const files = getMarkdownFiles("knowledge-hub")
    notesData = files.map((file) => ({
      slug: file.slug,
      title: file.frontMatter.title,
      excerpt: file.frontMatter.excerpt || "",
      date: file.frontMatter.date,
      tags: file.frontMatter.tags || [],
      category: file.frontMatter.category || "Uncategorized",
    }))
  } catch (error) {
    console.error("Error loading knowledge hub data:", error)
    // notesData remains empty array
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <KnowledgeHubProvider initialNotes={notesData}>
          <KnowledgeHubSection initialNotes={notesData} />
        </KnowledgeHubProvider>
      </div>
      <Footer />
    </main>
  )
}
