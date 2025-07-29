"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Tag, Calendar, FileText, Network } from "lucide-react"
import { CustomCategoryDropdown } from "./custom-category-dropdown"

// Define the Note interface
interface Note {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  category: string
}

interface KnowledgeHubSectionProps {
  initialNotes: Note[]
}

const KnowledgeHubSection = ({ initialNotes }: KnowledgeHubSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const notes = initialNotes || []

  // Get unique categories
  const getCategories = (): string[] => {
    return Array.from(new Set(notes.map((note) => note.category)))
  }

  const categories = ["all", ...getCategories()]

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = activeCategory === "all" || note.category === activeCategory

    return matchesSearch && matchesCategory
  })

  if (!notes.length) {
    return (
      <section id="knowledge-hub" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p>No notes found. Add some Markdown files to the content/knowledge-hub directory.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="knowledge-hub" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Knowledge Hub</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my Obsidian notes and knowledge base on various technical topics.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search notes..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Custom Scrollable Category Dropdown */}
            <CustomCategoryDropdown
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"} found
              {activeCategory !== "all" && (
                <span>
                  {" "}
                  in <span className="capitalize font-medium">{activeCategory}</span>
                </span>
              )}
              {searchTerm && (
                <span>
                  {" "}
                  matching "<span className="font-medium">{searchTerm}</span>"
                </span>
              )}
            </p>
          </div>

          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNotes.map((note) => (
                <Card key={note.slug} className="overflow-hidden">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{note.date}</span>
                      {note.category && (
                        <>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">
                            {note.category}
                          </Badge>
                        </>
                      )}
                    </div>
                    <p className="mb-4">{note.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {note.tags.map((tag) => (
                        <Link key={tag} href={`/tags/${tag}`}>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1 hover:bg-primary/10 cursor-pointer"
                          >
                            <Tag className="h-3 w-3" />
                            {tag}
                          </Badge>
                        </Link>
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
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No notes found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || activeCategory !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "No notes available in the knowledge hub"}
              </p>
              {(searchTerm || activeCategory !== "all") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setActiveCategory("all")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}

          <div className="mt-12 text-center">
            <div className="inline-block p-4 bg-primary/5 rounded-lg mb-6">
              <Network className="h-12 w-12 text-primary mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Knowledge Graph</h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Explore connections between my notes and ideas through an interactive knowledge graph.
            </p>
            <Button asChild>
              <Link href="/knowledge-hub/graph">View Knowledge Graph</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default KnowledgeHubSection
