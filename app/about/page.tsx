import type { Metadata } from "next"
import AboutSection from "@/components/about-section"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "About | Matthieu GUYOT",
  description: "Learn more about Matthieu GUYOT's background, experience, and skills",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <AboutSection />
      </div>
      <Footer />
    </main>
  )
}
