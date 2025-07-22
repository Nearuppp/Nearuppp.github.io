import type { Metadata } from "next"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import KnowledgeGraph from "@/components/knowledge-graph"
import { getMarkdownFiles } from "@/lib/markdown"

export const metadata: Metadata = {
  title: "Knowledge Graph | Matthieu GUYOT",
  description: "Explore the connections between Matthieu GUYOT's knowledge base",
}

export default function KnowledgeGraphPage() {
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
      <section className="py-20 pt-32">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link href="/knowledge-hub">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Knowledge Hub
              </Button>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Knowledge Graph</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the connections between different notes and concepts in my knowledge base. Hover over nodes to see
              details and click to navigate to the related note.
            </p>
          </div>

          {notesData.length > 0 ? (
            <div className="bg-card rounded-lg shadow-sm p-4 h-[600px]">
              <KnowledgeGraph initialNotes={notesData} />
            </div>
          ) : (
            <div className="bg-card rounded-lg shadow-sm p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No Notes Available</h3>
              <p className="text-muted-foreground mb-4">
                Add some markdown files to the content/knowledge-hub directory to see the knowledge graph.
              </p>
              <Link href="/knowledge-hub">
                <Button>Go to Knowledge Hub</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
