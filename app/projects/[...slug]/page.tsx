import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getMarkdownFileBySlug, getAllSlugs, getRelatedNotes, processMarkdownContent } from "@/lib/markdown"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowLeft, Github, ExternalLink, Calendar, FileText } from "lucide-react"

// Update the imports to include all necessary markdown plugins
import MarkdownContent from "@/components/markdown-content"
// import Markdown from "react-markdown"
// import remarkGfm from "remark-gfm"
// import remarkBreaks from "remark-breaks"
// import rehypeRaw from "rehype-raw"
// import rehypeSanitize from "rehype-sanitize"

// Generate static paths for all projects
export async function generateStaticParams() {
  try {
    const slugs = getAllSlugs("projects", true)
    console.log("Generated static params for projects:", slugs)
    return slugs.map((slug) => ({ slug: slug.split("/") }))
  } catch (error) {
    console.error("Error in generateStaticParams:", error)
    return []
  }
}

interface ProjectPageProps {
  params: { slug: string[] }
}

// Generate metadata (title, description, Open Graph, etc.)
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const slugPath = params.slug.join("/")
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
  const project = getMarkdownFileBySlug("projects", slugPath)

  if (!project) {
    return { title: "Project Not Found" }
  }

  return {
    title: `${project.frontMatter.title} | Matthieu GUYOT`,
    description: project.frontMatter.excerpt,
    openGraph: {
      images: [
        project.frontMatter.image
          ? `${basePath}${project.frontMatter.image}`
          : `${basePath}/placeholder.svg?height=600&width=800`,
      ],
    },
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const slugPath = params.slug.join("/")
  console.log(`Attempting to load project with slug: ${slugPath}`)

  const project = getMarkdownFileBySlug("projects", slugPath)
  if (!project) notFound()

  console.log(`Successfully loaded project: ${project.frontMatter.title}`)

  const isMainProject = params.slug.length === 1
  const relatedNotes = isMainProject ? getRelatedNotes("projects", slugPath) : []
  const mainProjectSlug = isMainProject ? slugPath : params.slug[0]
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
  const processedContent = processMarkdownContent(project.content, basePath)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="py-20 pt-32">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            {isMainProject ? (
              <Link href={`${basePath}/projects`}>
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Projects
                </Button>
              </Link>
            ) : (
              <Link href={`${basePath}/projects/${mainProjectSlug}`}>
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Main Project
                </Button>
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold mb-4">{project.frontMatter.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <Calendar className="h-4 w-4" />
                <span>{project.frontMatter.date}</span>
              </div>

              {isMainProject && (
                <div className="relative h-80 w-full rounded-lg overflow-hidden mb-8">
                  <Image
                    src={
                      project.frontMatter.image
                        ? `${basePath}${project.frontMatter.image}`
                        : `${basePath}/placeholder.svg?height=600&width=800`
                    }
                    alt={project.frontMatter.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <MarkdownContent content={processedContent} className="max-w-none" />
            </div>

            <div className="space-y-6">
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-muted-foreground">Category</h4>
                    <p>{project.frontMatter.category}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-muted-foreground">Technologies</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.frontMatter.tags?.map((tag: string) => (
                        <Link key={tag} href={`${basePath}/tags/${tag}`}>
                          <Badge variant="secondary" className="hover:bg-primary/20 cursor-pointer">
                            {tag}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {isMainProject && project.frontMatter.repoUrl && (
                    <div className="pt-4 space-y-2">
                      <Button variant="outline" className="w-full gap-2" asChild>
                        <a href={project.frontMatter.repoUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" /> View Source Code
                        </a>
                      </Button>
                      {project.frontMatter.demoUrl && (
                        <Button className="w-full gap-2" asChild>
                          <a href={project.frontMatter.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" /> Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {isMainProject && relatedNotes.length > 0 && (
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" /> Related Notes
                  </h3>
                  <div className="space-y-3">
                    {relatedNotes.map((note) => (
                      <Card key={note.slug} className="overflow-hidden">
                        <CardContent className="p-4">
                          <h4 className="font-medium">{note.frontMatter.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{note.frontMatter.excerpt}</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button variant="ghost" size="sm" className="w-full" asChild>
                            <Link href={`${basePath}/projects/${mainProjectSlug}/${note.slug.split("/").pop()}`}>
                              View Note
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
