import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getMarkdownFileBySlug, getAllSlugs, processMarkdownContent } from "@/lib/markdown"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import MarkdownContent from "@/components/markdown-content"

// Generate static paths for all notes
export async function generateStaticParams() {
  try {
    const slugs = getAllSlugs("knowledge-hub")
    console.log("Generated static params for knowledge-hub:", slugs)
    return slugs.map((slug) => ({ slug }))
  } catch (error) {
    console.error("Error in generateStaticParams for knowledge-hub:", error)
    return []
  }
}

interface NotePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = params
  const note = getMarkdownFileBySlug("knowledge-hub", slug)

  if (!note) {
    return {
      title: "Note Not Found",
    }
  }

  return {
    title: `${note.frontMatter.title} | Matthieu GUYOT`,
    description: note.frontMatter.excerpt,
  }
}

export default function NotePage({ params }: NotePageProps) {
  const { slug } = params
  console.log(`Attempting to load note with slug: ${slug}`)

  const note = getMarkdownFileBySlug("knowledge-hub", slug)

  if (!note) {
    console.error(`Note not found for slug: ${slug}`)
    notFound()
  }

  console.log(`Successfully loaded note: ${note.frontMatter.title}`)

  // Get the base path for links
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

  // Process markdown content to fix internal links
  const processedContent = processMarkdownContent(note.content, basePath)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="py-20 pt-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <Link href={`${basePath}/knowledge-hub/`}>
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Knowledge Hub
              </Button>
            </Link>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-sm">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4">{note.frontMatter.title}</h1>

              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Calendar className="h-4 w-4" />
                <span>{note.frontMatter.date}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {note.frontMatter.tags?.map((tag: string) => (
                  <Link key={tag} href={`${basePath}/tags/${tag}/`}>
                    <Badge variant="outline" className="flex items-center gap-1 hover:bg-primary/10 cursor-pointer">
                      <Tag className="h-3 w-3" />
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>

              <div className="bg-muted/30 p-4 rounded-lg mb-6">
                <p className="italic">{note.frontMatter.excerpt}</p>
              </div>
            </div>

            <MarkdownContent content={processedContent} className="max-w-none" />
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
