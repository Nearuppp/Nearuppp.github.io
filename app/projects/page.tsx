import type { Metadata } from "next"
import ProjectsSection from "@/components/projects-section"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ProjectsProvider } from "@/components/projects-provider"
import { getMarkdownFiles } from "@/lib/markdown"

export const metadata: Metadata = {
  title: "Projects | Matthieu GUYOT",
  description: "Explore Matthieu GUYOT's portfolio of projects in development and security",
}

export default function ProjectsPage() {
  // Get projects data at build time - only main projects
  const projectsData = getMarkdownFiles("projects", true).map((file) => ({
    slug: file.slug,
    title: file.frontMatter.title,
    description: file.frontMatter.excerpt || "",
    image: file.frontMatter.image || "/placeholder.svg?height=400&width=600",
    tags: file.frontMatter.tags || [],
    demoUrl: file.frontMatter.demoUrl,
    repoUrl: file.frontMatter.repoUrl,
    featured: file.frontMatter.featured || false,
    date: file.frontMatter.date,
  }))

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <ProjectsProvider initialProjects={projectsData}>
          <ProjectsSection initialProjects={projectsData} />
        </ProjectsProvider>
      </div>
      <Footer />
    </main>
  )
}
