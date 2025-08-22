import * as React from "react"
import { cn } from "@/lib/utils"

// Wrapper utama
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-xl border bg-white shadow-sm", className)}
      {...props}
    />
  )
}

// Bagian header
export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4 border-b border-[#fff]", className)} {...props} />
  )
}

// Judul (title) dalam header
export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
  )
}

// Subtitle / deskripsi kecil
export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-gray-500", className)} {...props} />
  )
}

// Bagian isi card
export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4", className)} {...props} />
  )
}

// Bagian footer card (misalnya untuk button)
export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4 border-t", className)} {...props} />
  )
}
