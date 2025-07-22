const fs = require("fs")
const path = require("path")

// Create public/images directory
const imagesDir = path.join(process.cwd(), "public", "images")
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
  console.log("Created public/images directory")
}

// Create a placeholder image
const placeholderSvg = `<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f0f0f0"/>
  <text x="50%" y="50%" font-family="Arial" font-size="24" text-anchor="middle" dominant-baseline="middle" fill="#666">Image Placeholder</text>
</svg>`

fs.writeFileSync(path.join(imagesDir, "auth-system.jpg.svg"), placeholderSvg)
console.log("Created placeholder image")
