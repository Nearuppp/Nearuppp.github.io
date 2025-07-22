"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin } from "lucide-react"
import { TypeAnimation } from "react-type-animation"

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background with subtle animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Profile Image */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
            <Image
              src="/Selfie.jpg?height=256&width=256"
              alt="Matthieu GUYOT"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Matthieu GUYOT</h1>

            <div className="h-12 mb-6">
              <TypeAnimation
                sequence={[
                  "Building the Future with Code",
                  2000,
                  "Building the Future with Security",
                  2000,
                  "Building the Future with Code & Security",
                  3000,
                ]}
                wrapper="h2"
                speed={50}
                className="text-xl md:text-2xl text-primary font-medium"
                repeat={Number.POSITIVE_INFINITY}
              />
            </div>

            <p className="text-muted-foreground mb-8 max-w-lg">
              Passionate about technology, cybersecurity, and knowledge sharing. Welcome to my digital space where I
              showcase my work and thoughts.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Button
  size="lg"
  className="rounded-full"
  onClick={() => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }}
>
  View Projects
</Button>
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Download Resume
                </a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-8 justify-center md:justify-start">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 hover:text-primary"
                asChild
              >
                <a href="https://github.com/Nearuppp" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 hover:text-primary"
                asChild
              >
                <a href="https://www.linkedin.com/in/3-100matthieuguyot/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 hover:text-primary"
                asChild
              >
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => {
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
            }}
            aria-label="Scroll down"
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
