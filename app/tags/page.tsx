import type { Metadata } from "next"
import Link from "next/link"
import { getAllUniqueTags, getAllContentByTag } from "@/lib/tags"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TagIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Tags | Matthieu GUYOT",
  description: "Browse content by tags in Matthieu GUYOT's portfolio",
}

export default function TagsPage() {
  const tags = getAllUniqueTags()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="py-20 pt-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Browse by Tags</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore content by topic across projects and knowledge hub entries.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tags.map((tag) => {
                const { projects, knowledgeHub } = getAllContentByTag(tag)
                const count = projects.length + knowledgeHub.length

                return (
                  <Link key={tag} href={`/tags/${tag}`}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TagIcon className="h-5 w-5 text-primary" />
                          <span className="text-lg font-medium">{tag}</span>
                        </div>
                        <Badge variant="secondary">{count} items</Badge>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
