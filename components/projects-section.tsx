"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Define the Project interface
interface Project {
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl?: string
  repoUrl?: string
  featured: boolean
  date: string
}

interface ProjectsSectionProps {
  initialProjects: Project[]
}

const ProjectsSection = ({ initialProjects }: ProjectsSectionProps) => {
  const [filter, setFilter] = useState("all")
  const projects = initialProjects || []

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true
    if (filter === "featured") return project.featured
    return project.tags.includes(filter)
  })

  const uniqueTags = Array.from(new Set(projects.flatMap((project) => project.tags)))

  if (!projects.length) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <p>No projects found. Add some Markdown files to the content/projects directory.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my technical projects, ranging from security tools to web applications.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className="rounded-full"
            >
              All
            </Button>
            <Button
              variant={filter === "featured" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("featured")}
              className="rounded-full"
            >
              Featured
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Categories
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {uniqueTags.map((tag) => (
                  <DropdownMenuItem
                    key={tag}
                    onClick={() => setFilter(tag)}
                    className={filter === tag ? "bg-primary/10 text-primary" : ""}
                  >
                    {tag}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.slug} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                {project.featured && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="default" className="bg-primary">
                      Featured
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Link key={tag} href={`/tags/${tag}`}>
                      <Badge key={tag} variant="secondary" className="hover:bg-primary/20 cursor-pointer">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    Code
                  </a>
                </Button>
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
    </section>
  )
}

export default ProjectsSection
