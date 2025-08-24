import * as React from "react"
import { cn } from "@/lib/utils"

// Wrapper utama
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-xl border border-base bg-card shadow-sm", className)}
      {...props}
    />
  )
}

// Bagian header
export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4 border-b border-base", className)} {...props} />
  )
}

// Judul (title) dalam header
export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-app",
        className
      )}
      {...props}
    />
  )
}

// Subtitle / deskripsi kecil
export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-app opacity-70", className)}
      {...props}
    />
  )
}

// Bagian isi card
export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4 text-app", className)} {...props} />
  )
}

// Bagian footer card (misalnya untuk button)
export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4 border-t border-base", className)} {...props} />
  )
}
