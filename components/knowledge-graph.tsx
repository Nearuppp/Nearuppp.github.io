"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import type { Note } from "./knowledge-hub-provider"
import * as d3 from "d3"

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
  group: "tag" | "note"
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
  const fgRef = useRef<any>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showTagFilter, setShowTagFilter] = useState(false)

  useEffect(() => setIsMounted(true), [])

  useEffect(() => {
    if (!initialNotes.length || !isMounted) return

    const filteredNotes =
      selectedTags.length > 0
        ? initialNotes.filter((note) =>
            note.tags.some((tag) => selectedTags.includes(tag))
          )
        : initialNotes

    const tagSet = new Set<string>()
    filteredNotes.forEach((note) => note.tags.forEach((tag) => tagSet.add(tag)))

    const tagNodes: GraphNode[] = Array.from(tagSet).map((tag) => ({
      id: `tag-${tag}`,
      name: tag,
      val: 2,
      slug: "",
      category: "tag",
      group: "tag",
    }))

    const noteNodes: GraphNode[] = filteredNotes.map((note) => ({
      id: `note-${note.slug}`,
      name: note.title,
      val: 6,
      slug: note.slug,
      category: note.category,
      group: "note",
    }))

    const links: GraphLink[] = []

    filteredNotes.forEach((note) => {
      note.tags.forEach((tag) => {
        links.push({
          source: `tag-${tag}`,
          target: `note-${note.slug}`,
          value: 1,
        })
      })
    })

    setGraphData({ nodes: [...tagNodes, ...noteNodes], links })
  }, [initialNotes, isMounted, selectedTags])

  useEffect(() => {
    if (!fgRef.current || !graphData.nodes.length) return

    fgRef.current.d3Force("center", null)
    fgRef.current.d3Force("x", null)
    fgRef.current.d3Force("y", null)

    fgRef.current.d3Force("charge", d3.forceManyBody().strength(-3000))
    fgRef.current.d3Force(
      "link",
      d3
        .forceLink(graphData.links)
        .id((d: any) => d.id)
        .distance(400)
        .strength(0.2)
    )

    // Enhanced collision detection to prevent label overlap
    fgRef.current.d3Force(
      "collide",
      d3
        .forceCollide()
        .radius((d: any) => {
          const nodeRadius = Math.max(4, d.val * 4)
          const fontSize = 14
          const textHeight = fontSize + 8
          return Math.max(nodeRadius, 25) + textHeight + 30
        })
        .strength(1.0) // Increased strength for better spacing
        .iterations(6) // More iterations for better collision resolution
    )

    fgRef.current.d3AlphaDecay(0.01)
    fgRef.current.d3VelocityDecay(0.8)
  }, [graphData])

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowTagFilter(false)
      }
    }

    if (showTagFilter) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showTagFilter])

  const handleNodeClick = (node: GraphNode) => {
    if (node.group === "note" && node.slug) {
      router.push(`/knowledge-hub/${node.slug}`)
    }
  }

  const handleEngineStop = () => {
    // fgRef.current?.zoomToFit(400)
  }

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
    <div ref={containerRef} className="w-full h-full relative">
      {graphData.nodes.length > 0 && (
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeLabel={null} // Disable default tooltips
          nodeAutoColorBy="group"
          linkDirectionalParticles={2}
          linkDirectionalParticleSpeed={(d: any) => d.value * 0.001}
          cooldownTicks={300}
          onEngineStop={handleEngineStop}
          backgroundColor={theme === "dark" ? "#1e1e1e" : "#f8fafc"}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.3}
          nodeRelSize={6}
          linkWidth={1}
          linkColor={() =>
            theme === "dark"
              ? "rgba(148, 163, 184, 0.6)"
              : "rgba(71, 85, 105, 0.6)"
          }
          nodeCanvasObject={(node: any, ctx, globalScale) => {
            const label = node.name
            const nodeRadius = Math.max(4, node.val * 4)
            const fontSize = 14 // Fixed font size for readability
            const padding = 4
            const textHeight = fontSize + padding

            // Draw node circle
            ctx.beginPath()
            ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI)
            ctx.fillStyle = node.group === "tag" ? "#dd2dddff" : "#0668E1"
            ctx.fill()

            ctx.strokeStyle =
              theme === "dark"
                ? "rgba(255, 255, 255, 0.3)"
                : "rgba(0, 0, 0, 0.3)"
            ctx.lineWidth = 1
            ctx.stroke()

            // Always draw label with black background and white text
            ctx.font = `${fontSize}px Inter, system-ui, sans-serif`
            const textWidth = ctx.measureText(label).width
            
            // Draw background rectangle for text
            const rectX = node.x - textWidth / 2 - padding
            const rectY = node.y + nodeRadius + 2
            const rectWidth = textWidth + padding * 2
            const rectHeight = textHeight
            
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
            ctx.beginPath()
            ctx.roundRect(rectX, rectY, rectWidth, rectHeight, 4)
            ctx.fill()
            
            // Draw text
            ctx.textAlign = "center"
            ctx.textBaseline = "top"
            ctx.fillStyle = "#ffffff" // White text
            ctx.fillText(label, node.x, rectY + padding / 2)
          }}
          onNodeHover={(node) => {
            if (containerRef.current) {
              containerRef.current.style.cursor = node ? "pointer" : "default"
            }
          }}
          onNodeClick={handleNodeClick}
        />
      )}
    </div>
  )
}

export default KnowledgeGraph