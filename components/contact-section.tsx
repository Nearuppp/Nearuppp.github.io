"use client"

import { Mail, Github, Linkedin, } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const ContactSection = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Connect With Me
              </h3>

              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Feel free to reach out through any of these platforms. I'm always open to discussing new projects,
                  creative ideas, or opportunities to be part of your vision.
                </p>

                <div className="space-y-4">
                  <a
                    href="mailto:matthieu.guyot.2003@gmail.com"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-sm text-muted-foreground">matthieu.guyot.2003@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="https://github.com/Nearuppp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Github className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">GitHub</h4>
                      <p className="text-sm text-muted-foreground">https://github.com/Nearuppp</p>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/3-100matthieuguyot/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Linkedin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">LinkedIn</h4>
                      <p className="text-sm text-muted-foreground">https://www.linkedin.com/matthieuguyot/</p>
                    </div>
                  </a>

                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
