import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
