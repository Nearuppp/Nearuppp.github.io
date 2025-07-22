import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import KnowledgeHubSection from "@/components/knowledge-hub-section"
import Footer from "@/components/footer"
import { ProjectsProvider } from "@/components/projects-provider"
import ProjectsSection from "@/components/projects-section"
import { KnowledgeHubProvider } from "@/components/knowledge-hub-provider"
import { getMarkdownFiles } from "@/lib/markdown"

export default function Home() {
  // Get projects data at build time - only main projects
  let projectsData: any[] = []
  let notesData: any[] = []

  try {
    const projectFiles = getMarkdownFiles("projects", true)
    projectsData = projectFiles.map((file) => ({
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
  } catch (error) {
    console.error("Error loading projects data:", error)
  }

  try {
    const knowledgeFiles = getMarkdownFiles("knowledge-hub")
    notesData = knowledgeFiles.map((file) => ({
      slug: file.slug,
      title: file.frontMatter.title,
      excerpt: file.frontMatter.excerpt || "",
      date: file.frontMatter.date,
      tags: file.frontMatter.tags || [],
      category: file.frontMatter.category || "Uncategorized",
    }))
  } catch (error) {
    console.error("Error loading knowledge hub data:", error)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsProvider initialProjects={projectsData}>
        <ProjectsSection initialProjects={projectsData} />
      </ProjectsProvider>
      <KnowledgeHubProvider initialNotes={notesData}>
        <KnowledgeHubSection initialNotes={notesData} />
      </KnowledgeHubProvider>
      <ContactSection />
      <Footer />
    </main>
  )
}
