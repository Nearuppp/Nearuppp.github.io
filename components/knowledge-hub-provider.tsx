"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { mockNotes } from "@/lib/mock-data"

// Define the Note interface
export interface Note {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  category: string
  content?: string
}

// Define the context interface
interface KnowledgeHubContextType {
  notes: Note[]
  loading: boolean
  error: string | null
  getNoteBySlug: (slug: string) => Note | undefined
  getCategories: () => string[]
  getTags: () => string[]
}

// Create the context
const KnowledgeHubContext = createContext<KnowledgeHubContextType | undefined>(undefined)

// Create the provider component
export function KnowledgeHubProvider({
  children,
  initialNotes = mockNotes,
}: {
  children: React.ReactNode
  initialNotes?: Note[]
}) {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getNoteBySlug = (slug: string): Note | undefined => {
    return notes.find((note) => note.slug === slug)
  }

  const getCategories = (): string[] => {
    return Array.from(new Set(notes.map((note) => note.category)))
  }

  const getTags = (): string[] => {
    const allTags = notes.flatMap((note) => note.tags)
    return Array.from(new Set(allTags))
  }

  return (
    <KnowledgeHubContext.Provider value={{ notes, loading, error, getNoteBySlug, getCategories, getTags }}>
      {children}
    </KnowledgeHubContext.Provider>
  )
}

// Create a hook to use the context
export function useKnowledgeHub() {
  const context = useContext(KnowledgeHubContext)
  if (context === undefined) {
    throw new Error("useKnowledgeHub must be used within a KnowledgeHubProvider")
  }
  return context
}
