"use client"

const fs = require("fs")
const path = require("path")

// Define the content directory
const contentDir = path.join(process.cwd(), "content")

// Create the content directory if it doesn't exist
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir)
  console.log("Created content directory")
}

// Create the projects directory if it doesn't exist
const projectsDir = path.join(contentDir, "projects")
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir)
  console.log("Created projects directory")
}

// Create the knowledge-hub directory if it doesn't exist
const knowledgeHubDir = path.join(contentDir, "knowledge-hub")
if (!fs.existsSync(knowledgeHubDir)) {
  fs.mkdirSync(knowledgeHubDir)
  console.log("Created knowledge-hub directory")
}

// Create the public/images directory if it doesn't exist
const imagesDir = path.join(process.cwd(), "public", "images")
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
  console.log("Created public/images directory")
}

// Create sample project content
const sampleProject = `---
title: "Sample Project"
date: "2024-01-15"
excerpt: "This is a sample project to demonstrate the portfolio functionality."
tags: ["React", "Next.js", "TypeScript"]
category: "Development"
featured: true
image: "/placeholder.svg?height=400&width=600"
demoUrl: "https://example.com"
repoUrl: "https://github.com/example/repo"
isMainProject: true
---

# Sample Project

This is a sample project to demonstrate the portfolio functionality.

## Overview

This project showcases various technologies and demonstrates best practices in modern web development.

## Features

- Modern React with TypeScript
- Responsive design with Tailwind CSS
- Static site generation with Next.js
- Markdown-based content management

## Implementation

The project is built using Next.js 14 with the App Router, providing excellent performance and SEO capabilities.

## Getting Started

To run this project locally:

1. Clone the repository
2. Install dependencies with \`npm install\`
3. Run the development server with \`npm run dev\`

## Technologies Used

- **Frontend**: React, Next.js, TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown with gray-matter
- **Deployment**: Static export for GitHub Pages
`

fs.writeFileSync(path.join(projectsDir, "sample-project.md"), sampleProject)
console.log("Created sample project")

// Create sample knowledge hub content
const sampleNote = `---
title: "Getting Started with Next.js"
date: "2024-01-15"
excerpt: "A comprehensive guide to getting started with Next.js for modern web development."
tags: ["Next.js", "React", "Web Development"]
category: "Development"
---

# Getting Started with Next.js

Next.js is a powerful React framework that enables you to build full-stack web applications with ease.

## Key Features

- **Server-Side Rendering (SSR)**: Improves performance and SEO
- **Static Site Generation (SSG)**: Pre-renders pages at build time
- **API Routes**: Build API endpoints within your Next.js application
- **File-based Routing**: Automatic routing based on file structure

## Installation

To create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Project Structure

A typical Next.js project structure includes:

- \`pages/\` or \`app/\` - Your application pages
- \`public/\` - Static assets
- \`styles/\` - CSS files
- \`components/\` - Reusable React components

## Best Practices

1. Use TypeScript for better development experience
2. Implement proper SEO with metadata
3. Optimize images with next/image
4. Use dynamic imports for code splitting
5. Implement proper error handling

## Conclusion

Next.js provides an excellent foundation for building modern web applications with React.
`

fs.writeFileSync(path.join(knowledgeHubDir, "getting-started-nextjs.md"), sampleNote)
console.log("Created sample knowledge hub note")

// Create another sample note
const sampleNote2 = `---
title: "React Performance Optimization"
date: "2024-01-10"
excerpt: "Learn essential techniques for optimizing React application performance."
tags: ["React", "Performance", "Optimization"]
category: "Development"
---

# React Performance Optimization

Performance optimization is crucial for creating smooth and responsive React applications.

## Common Performance Issues

1. **Unnecessary Re-renders**: Components re-rendering when they shouldn't
2. **Large Bundle Sizes**: Too much JavaScript being loaded
3. **Inefficient State Management**: Poor state structure causing cascading updates
4. **Memory Leaks**: Components not cleaning up properly

## Optimization Techniques

### 1. Use React.memo

\`\`\`jsx
const MyComponent = React.memo(function MyComponent({ name }) {
  return <div>Hello {name}</div>
})
\`\`\`

### 2. Implement useMemo and useCallback

\`\`\`jsx
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b)
}, [a, b])

const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
\`\`\`

### 3. Code Splitting

\`\`\`jsx
const LazyComponent = lazy(() => import('./LazyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  )
}
\`\`\`

## Measuring Performance

Use React DevTools Profiler to identify performance bottlenecks and measure the impact of your optimizations.

## Conclusion

Regular performance monitoring and optimization ensure your React applications remain fast and responsive as they grow.
`

fs.writeFileSync(path.join(knowledgeHubDir, "react-performance-optimization.md"), sampleNote2)
console.log("Created second sample knowledge hub note")

console.log("\nSetup complete! You can now:")
console.log("1. Run 'npm run dev' to start the development server")
console.log("2. Add more content to the content/projects and content/knowledge-hub directories")
console.log("3. Run 'npm run build' to build the site for production")
