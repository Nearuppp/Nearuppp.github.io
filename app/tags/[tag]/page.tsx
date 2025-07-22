import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getAllUniqueTags, getAllContentByTag } from "@/lib/tags"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowLeft, TagIcon, ExternalLink, Github } from "lucide-react"

// Generate static paths for all tags
export async function generateStaticParams() {
  const tags = getAllUniqueTags()
  return tags.map((tag) => ({ tag }))
}

interface TagPageProps {
  params: {
    tag: string
  }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = params
  return {
    title: `#${tag} | Matthieu GUYOT`,
    description: `Content tagged with #${tag}`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = params
  const { projects, knowledgeHub } = getAllContentByTag(tag)

  // If no content found with this tag, return 404
  if (projects.length === 0 && knowledgeHub.length === 0) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="py-20 pt-32">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link href="/tags">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to All Tags
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-lg">
              <TagIcon className="h-5 w-5 mr-2" />
              {tag}
            </Badge>
            <h1 className="text-3xl font-bold mb-4">Content Tagged with #{tag}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore all projects and knowledge hub entries related to this topic.
            </p>
          </div>

          {projects.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <Card key={project.slug} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={project.frontMatter.image || "/placeholder.svg"}
                        alt={project.frontMatter.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                      {project.frontMatter.featured && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="default" className="bg-primary">
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-2">{project.frontMatter.title}</h3>
                      <p className="text-muted-foreground mb-4">{project.frontMatter.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.frontMatter.tags?.map((projectTag) => (
                          <Badge key={projectTag} variant={projectTag === tag ? "default" : "secondary"}>
                            {projectTag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {project.frontMatter.repoUrl && (
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                          <a href={project.frontMatter.repoUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                            Code
                          </a>
                        </Button>
                      )}
                      <Button size="sm" className="gap-2" asChild>
                        <Link href={`/projects/${project.slug}`}>
                          <ExternalLink className="h-4 w-4" />
                          Details
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {knowledgeHub.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Knowledge Hub</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {knowledgeHub.map((note) => (
                  <Card key={note.slug} className="overflow-hidden">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-2">{note.frontMatter.title}</h3>
                      <p className="mb-4">{note.frontMatter.excerpt}</p>
                      <div className="flex flex-wrap gap-2">
                        {note.frontMatter.tags?.map((noteTag) => (
                          <Badge
                            key={noteTag}
                            variant={noteTag === tag ? "default" : "outline"}
                            className="flex items-center gap-1"
                          >
                            <TagIcon className="h-3 w-3" />
                            {noteTag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full" asChild>
                        <Link href={`/knowledge-hub/${note.slug}`}>Read More</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
