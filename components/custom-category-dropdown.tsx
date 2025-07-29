"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Filter, Check } from "lucide-react"

interface CustomCategoryDropdownProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function CustomCategoryDropdown({ categories, activeCategory, onCategoryChange }: CustomCategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        className="w-full sm:w-auto justify-between min-w-[160px] bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="capitalize">{activeCategory === "all" ? "All Categories" : activeCategory}</span>
        </div>
        <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-md shadow-lg z-50">
          <div
            className="py-1 max-h-48 overflow-y-auto overflow-x-hidden"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0,0,0,0.2) transparent",
            }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground flex items-center justify-between capitalize ${
                  activeCategory === category ? "bg-primary/10 text-primary font-medium" : ""
                }`}
              >
                {category === "all" ? "All Categories" : category}
                {activeCategory === category && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
