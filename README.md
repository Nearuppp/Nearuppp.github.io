# Matthieu GUYOT Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a knowledge hub with markdown-based content management and interactive graph visualization.

## 🚀 Features

- **Static Site Generation**: Optimized for performance and SEO
- **Responsive Design**: Works perfectly on all devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Knowledge Hub**: Markdown-based content management system
- **Interactive Graph**: Visualize connections between knowledge entries
- **Project Showcase**: Display your projects with detailed information
- **Tag System**: Organize content by topics and technologies
- **GitHub Pages Ready**: Configured for easy deployment

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Content**: Markdown with gray-matter
- **Deployment**: GitHub Pages (Static Export)
- **Icons**: Lucide React

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── [routes]/         # Individual pages
├── components/            # Reusable components
├── content/              # Markdown content
│   ├── projects/         # Project files
│   └── knowledge-hub/    # Knowledge base
├── lib/                  # Utility functions
├── public/               # Static assets
└── scripts/              # Build and setup scripts
\`\`\`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up content structure**
   \`\`\`bash
   npm run setup-content
   \`\`\`

4. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

\`\`\`bash
npm run build
\`\`\`

The static files will be generated in the `out` directory.

## 📝 Content Management

### Adding Projects

1. Create a new markdown file in `content/projects/`
2. Add frontmatter with project details:
   \`\`\`yaml
   ---
   title: "Your Project Title"
   date: "2024-01-15"
   excerpt: "Brief description"
   tags: ["React", "TypeScript"]
   category: "Development"
   featured: true
   image: "/images/project-image.jpg"
   demoUrl: "https://demo.com"
   repoUrl: "https://github.com/user/repo"
   ---
   \`\`\`

### Adding Knowledge Hub Entries

1. Create a new markdown file in `content/knowledge-hub/`
2. Add frontmatter:
   \`\`\`yaml
   ---
   title: "Your Note Title"
   date: "2024-01-15"
   excerpt: "Brief description"
   tags: ["Technology", "Learning"]
   category: "Development"
   ---
   \`\`\`

### Using Scripts

- `npm run add-project` - Interactive project creation
- `npm run add-obsidian` - Import Obsidian markdown files
- `npm run check-content` - Verify content structure
- `npm run debug-notes` - Debug project notes

## 🌐 Deployment to GitHub Pages

### Automatic Deployment (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as the source
   - The workflow will automatically deploy your site

3. **Access Your Site**
   Your site will be available at: `https://yourusername.github.io/repository-name`

### Manual Deployment

1. **Build the site**
   \`\`\`bash
   NEXT_PUBLIC_BASE_PATH=/repository-name npm run build
   \`\`\`

2. **Deploy the `out` folder**
   Upload the contents of the `out` directory to your hosting provider.

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file for local development:

\`\`\`env
NEXT_PUBLIC_BASE_PATH=
\`\`\`

For GitHub Pages, the base path is automatically set in the workflow.

### Customization

- **Colors**: Edit `tailwind.config.ts` to change the color scheme
- **Fonts**: Modify `app/layout.tsx` to change fonts
- **Content**: Update markdown files in the `content` directory
- **Components**: Customize components in the `components` directory

## 📱 Features Overview

### Home Page
- Hero section with animated typing
- About section with tabbed content
- Featured projects showcase
- Knowledge hub preview
- Contact information

### Projects
- Grid layout with filtering
- Detailed project pages
- Related notes system
- Tag-based organization

### Knowledge Hub
- Search and filter functionality
- Category-based organization
- Interactive knowledge graph
- Markdown rendering with syntax highlighting

### Additional Pages
- Resume/CV page
- Contact page
- Tag-based content browsing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Lucide](https://lucide.dev/) for the icon set

---

Built with ❤️ by Matthieu GUYOT
