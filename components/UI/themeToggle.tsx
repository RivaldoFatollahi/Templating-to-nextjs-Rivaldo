"use client"

import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/UI/button"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  // cek theme saat mount
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true)
    }
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    if (html.classList.contains("dark")) {
      html.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setIsDark(false)
    } else {
      html.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setIsDark(true)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="absolute top-4 right-4"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  )
}
