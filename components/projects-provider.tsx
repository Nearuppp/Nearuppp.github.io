"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { mockProjects } from "@/lib/mock-data"

// Define the Project interface
export interface Project {
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl?: string
  repoUrl?: string
  featured: boolean
  date: string
  content?: string
}

// Define the context interface
interface ProjectsContextType {
  projects: Project[]
  loading: boolean
  error: string | null
  getProjectBySlug: (slug: string) => Project | undefined
}

// Create the context
const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined)

// Create the provider component
export function ProjectsProvider({
  children,
  initialProjects = mockProjects,
}: {
  children: React.ReactNode
  initialProjects?: Project[]
}) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getProjectBySlug = (slug: string): Project | undefined => {
    return projects.find((project) => project.slug === slug)
  }

  return (
    <ProjectsContext.Provider value={{ projects, loading, error, getProjectBySlug }}>
      {children}
    </ProjectsContext.Provider>
  )
}

// Create a hook to use the context
export function useProjects() {
  const context = useContext(ProjectsContext)
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider")
  }
  return context
}
