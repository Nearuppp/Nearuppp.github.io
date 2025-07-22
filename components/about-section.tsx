"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, GraduationCap, Award, Code, Shield, Database, Network, Server } from "lucide-react"

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("bio")

  const timelineItems = [
    {
      type: "work",
      title: "Senior Security Engineer",
      organization: "Tech Company",
      period: "2020 - Present",
      description: "Leading security initiatives and implementing robust security measures across the organization.",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      type: "education",
      title: "Master's in Cybersecurity",
      organization: "University",
      period: "2018 - 2020",
      description: "Specialized in advanced security protocols and penetration testing techniques.",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      type: "work",
      title: "Software Developer",
      organization: "Tech Startup",
      period: "2016 - 2020",
      description: "Developed secure applications and implemented best practices for code security.",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      type: "education",
      title: "Bachelor's in Computer Science",
      organization: "University",
      period: "2013 - 2016",
      description: "Focused on software engineering and computer systems architecture.",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      type: "achievement",
      title: "Certified Ethical Hacker",
      organization: "EC-Council",
      period: "2019",
      description: "Obtained certification demonstrating expertise in ethical hacking methodologies.",
      icon: <Award className="h-5 w-5" />,
    },
  ]

  const skills = [
    {
      category: "Development",
      items: ["JavaScript", "TypeScript", "Python", "React", "Node.js", "Next.js"],
      icon: <Code className="h-5 w-5" />,
    },
    {
      category: "Security",
      items: ["Penetration Testing", "Security Auditing", "Threat Modeling", "OWASP", "Secure Coding"],
      icon: <Shield className="h-5 w-5" />,
    },
    {
      category: "Data & Infrastructure",
      items: ["SQL", "NoSQL", "AWS", "Docker", "Kubernetes", "CI/CD"],
      icon: <Database className="h-5 w-5" />,
    },
    {
      category: "Networking",
      items: ["TCP/IP", "Firewalls", "VPNs", "Network Security", "Wireshark"],
      icon: <Network className="h-5 w-5" />,
    },
    {
      category: "Systems",
      items: ["Linux", "Windows Server", "Bash Scripting", "System Hardening"],
      icon: <Server className="h-5 w-5" />,
    },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my background, experience, and skills.
          </p>
        </div>

        <Tabs defaultValue="bio" value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="bio">Biography</TabsTrigger>
            <TabsTrigger value="timeline">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="bio" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="mb-4">
                    Hello! I'm Matthieu GUYOT, a passionate technologist with expertise in both software development and
                    cybersecurity. With over 8 years of experience in the tech industry, I've dedicated my career to
                    building secure, efficient, and innovative solutions.
                  </p>
                  <p className="mb-4">
                    My journey began with a deep fascination for how systems work and how they can be protected. This
                    dual interest led me to pursue formal education in both computer science and cybersecurity,
                    providing me with a unique perspective that bridges the gap between development and security.
                  </p>
                  <p className="mb-4">
                    I believe that the best security professionals understand development, and the best developers
                    understand security. This philosophy guides my approach to every project I undertake.
                  </p>
                  <p>
                    When I'm not coding or analyzing security vulnerabilities, I enjoy documenting my knowledge in my
                    Obsidian vault, contributing to open-source projects, and staying updated with the latest
                    technological advancements. I'm also passionate about sharing knowledge through mentoring and
                    writing technical articles.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="mt-6">
            <div className="space-y-8">
              {timelineItems.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 relative before:absolute before:left-6 before:top-10 before:h-full before:w-[1px] before:bg-border last:before:hidden"
                >
                  <div className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted shadow">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.organization} | {item.period}
                    </p>
                    <p className="mt-2">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skillGroup, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {skillGroup.icon}
                      </div>
                      <h3 className="text-lg font-semibold">{skillGroup.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default AboutSection
