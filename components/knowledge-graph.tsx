"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import type { Note } from "./knowledge-hub-provider"

// Dynamically import ForceGraph2D with no SSR
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading knowledge graph...</p>
      </div>
    </div>
  ),
})

interface GraphNode {
  id: string
  name: string
  val: number
  slug: string
  category: string
}

interface GraphLink {
  source: string
  target: string
  value: number
}

interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

interface KnowledgeGraphProps {
  initialNotes?: Note[]
}

const KnowledgeGraph = ({ initialNotes = [] }: KnowledgeGraphProps) => {
  const router = useRouter()
  const { theme } = useTheme()
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] })
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Ensure component is mounted before rendering
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Generate graph data from notes
  useEffect(() => {
    if (!initialNotes.length || !isMounted) return

    // Create nodes from notes
    const nodes: GraphNode[] = initialNotes.map((note) => ({
      id: note.slug,
      name: note.title,
      val: 1 + note.tags.length * 0.5, // Size based on number of tags
      slug: note.slug,
      category: note.category,
    }))

    // Create links based on shared tags and categories
    const links: GraphLink[] = []

    // Helper to check if two notes share tags
    const sharesTags = (note1: Note, note2: Note) => {
      return note1.tags.some((tag) => note2.tags.includes(tag))
    }

    // Create links between notes
    for (let i = 0; i < initialNotes.length; i++) {
      for (let j = i + 1; j < initialNotes.length; j++) {
        const note1 = initialNotes[i]
        const note2 = initialNotes[j]

        // Link if they share category or tags
        if (note1.category === note2.category || sharesTags(note1, note2)) {
          links.push({
            source: note1.slug,
            target: note2.slug,
            value: note1.category === note2.category ? 2 : 1,
          })
        }
      }
    }

    setGraphData({ nodes, links })
  }, [initialNotes, isMounted])

  // Handle window resize
  useEffect(() => {
    if (!isMounted) return

    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMounted])

  function isGraphNode(node: any): node is GraphNode {
    return typeof node.slug === 'string';
  }

  // Handle node click
  const handleNodeClick = (node: any, event: MouseEvent) => {
    if (isGraphNode(node)) {
      router.push(`/knowledge-hub/${node.slug}`)
    }
  }

  // Don't render anything until mounted
  if (!isMounted) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading knowledge graph...</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="w-full h-full">
      {graphData.nodes.length > 0 && (
        <ForceGraph2D
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeLabel="name"
          nodeColor={(node: any) => {
            // Color nodes by category
            const categories: Record<string, string> = {
              Security: "#3b82f6", // blue
              Development: "#10b981", // green
              Productivity: "#f59e0b", // amber
            }
            return categories[node.category] || "#6366f1" // Default to indigo
          }}
          linkWidth={(link: any) => link.value}
          linkColor={() => (theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)")}
          nodeCanvasObject={(node: any, ctx, globalScale) => {
            const label = node.name
            const fontSize = 12 / globalScale

            // Draw node circle
            ctx.beginPath()
            ctx.arc(node.x, node.y, node.val * 4, 0, 2 * Math.PI)
            ctx.fillStyle = node.color || "#3b82f6"
            ctx.fill()

            // Draw node label
            ctx.font = `${fontSize}px Sans-Serif`
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillStyle = theme === "dark" ? "white" : "black"
            ctx.fillText(label, node.x, node.y)
          }}
          onNodeClick={handleNodeClick}
          cooldownTicks={100}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={1}
          backgroundColor={theme === "dark" ? "#1e293b" : "#f8fafc"}
        />
      )}
    </div>
  )
}

export default KnowledgeGraph
