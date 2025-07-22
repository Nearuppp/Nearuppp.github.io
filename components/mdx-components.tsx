import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  BlockquoteHTMLAttributes,
  ReactNode,
  ComponentProps,
} from "react"


// Define custom MDX components
export const components = {
  h1: (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
  ),
  h3: (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
    <h3 className="text-xl font-bold mt-4 mb-2" {...props} />
  ),
  p: (props: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) => (
    <p className="my-4" {...props} />
  ),
  ul: (props: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => (
    <ul className="list-disc pl-6 my-4" {...props} />
  ),
  ol: (props: DetailedHTMLProps<HTMLAttributes<HTMLOListElement>, HTMLOListElement>) => (
    <ol className="list-decimal pl-6 my-4" {...props} />
  ),
  li: (props: DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>) => (
    <li className="mb-1" {...props} />
  ),
  a: ({ href = "#", children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <Link href={href} className="text-primary hover:underline" {...rest}>
    {children}
  </Link>),
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <div className="my-6">
      <Image src={src || "/placeholder.svg"} alt={alt || "Image"} width={800} height={400} className="rounded-lg" />
    </div>
  ),
  code: (props: ComponentProps<"code">) => (
  <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props} />
  ),
  pre: (props: ComponentProps<"pre">) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6" {...props} />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
  <blockquote className="border-l-4 border-primary pl-4 italic my-6" {...props} />
),
  Badge,
  Card,
  CardContent,
}

interface MDXContentProps {
  source: string
}

export function MDXContent({ source }: MDXContentProps) {
  return <MDXRemote source={source} components={components} />
}
