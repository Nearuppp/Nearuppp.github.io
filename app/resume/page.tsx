import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Briefcase, GraduationCap, Award, Code, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Resume | Matthieu GUYOT",
  description: "Matthieu GUYOT's professional resume and career highlights",
}

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="py-20 pt-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Matthieu GUYOT</h1>
              <p className="text-xl text-primary mb-4">Network Engineer & Developer</p>
              <p className="text-muted-foreground max-w-xl">
                Passionate technologist with experience in both software development and cybersecurity, dedicated to
                building secure and innovative solutions.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Button size="lg" className="gap-2" asChild>
                <a href="/resume.pdf" download>
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Experience Section */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold">Professional Experience</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium">Cybersecurity Apprentice</h3>
                        <span className="text-sm text-muted-foreground">2023 - Present</span>
                      </div>
                      <p className="text-primary">Procter & Gamble</p>
                      <ul className="mt-2 space-y-1 list-disc list-inside text-muted-foreground">
                        <li>Implemented new access management programs and tools that improved our user authentication processes and reduced unauthorized access incidents by 30%</li>
                        <li>Partnered with site application owners to improve application accessibility, ensuring compliance with guidelines and resolving audit-identified issues, leading to a 30% increase in user accessibility compliance.</li>
                        <li>Developed and deployed an automated access review solution utilizing Lansweeper, significantly enhancing real-time monitoring/detection capabilities and decreasing incident response time by 15%.</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium">Digitalization Apprentice</h3>
                        <span className="text-sm text-muted-foreground">2023 - 2024</span>
                      </div>
                      <p className="text-primary">Procter & Gamble</p>
                      <ul className="mt-2 space-y-1 list-disc list-inside text-muted-foreground">
                        <li>Contributed to the deployment of edge-to-cloud solutions, optimizing data processing and improving systemperformance across distributed networks</li>
                        <li>Leveraged Databricks to implement continuous improvements in different ETL, streamlining loss analysis and elimination processes, enhancing operational efficiency, and minimizing downtime.</li>
                        <li>Led data collection efforts, optimized dataset preprocessing, and executed in-depth data analysis, achieving a 20% boost in data accuracy and significantly enhancing decision-making efficiency in our systems.</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Education Section */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-6">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold">Education</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium">Masters in Computer Networks and Connected Objects</h3>
                        <span className="text-sm text-muted-foreground">2021 - 2026</span>
                      </div>
                      <p className="text-primary">UniLaSalle Amiens</p>
                      <p className="mt-2 text-muted-foreground">
                        Specialized in networking, IoT, electronic systems, and embedded systems.<br />
                        The school holds accreditation from the CTI.
                      </p>
                    </div>

                  </div>
                </CardContent>
              </Card>

              {/* Projects Section */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Code className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold">Key Projects</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Secure Authentication System</h3>
                      <p className="text-muted-foreground mt-1">
                        A robust authentication system with multi-factor authentication, JWT, and advanced security
                        features.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Vulnerability Scanner</h3>
                      <p className="text-muted-foreground mt-1">
                        An automated tool for scanning web applications and identifying security vulnerabilities based
                        on OWASP guidelines.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Knowledge Management System</h3>
                      <p className="text-muted-foreground mt-1">
                        A personal knowledge management system inspired by Obsidian with markdown support and graph
                        visualization.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              {/* Skills Section */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Shield className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Skills</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Development</h3>
                      <div className="flex flex-wrap gap-2">
                        {["JavaScript", "Python", "React", "Node.js", "Next.js", "Java", "C", "C++"].map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Networking</h3>
                      <div className="flex flex-wrap gap-2">
                        {["OSI", "IPv4 & IPv6", "4G LTE and 5G", "OWASP", "OSPF", "BGP"].map(
                          (skill) => (
                            <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                              {skill}
                            </span>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Infrastructure</h3>
                      <div className="flex flex-wrap gap-2">
                        {["AWS", "Docker", "Kubernetes", "CI/CD", "Linux"].map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Certifications Section */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Award className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Certifications</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Cisco Certified Network Associate (CCNA)</h3>
                      <p className="text-sm text-muted-foreground">Cisco, 2026</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Email: matthieu.guyot.2003@gmail.com</p>
                    <p>LinkedIn: www.linkedin.com/in/3-100matthieuguyot/</p>
                    <p>GitHub: github.com/Nearuppp</p>
                    <p>Location: Dallas, TX, United States</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
