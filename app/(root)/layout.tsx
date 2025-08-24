"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/Layout/Sidebar"
import Navbar from "@/components/Layout/Navbar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [navigation, setNavigation] = useState<"sidebar" | "navbar">("sidebar")

  // ✅ Sync navigation dari localStorage
  useEffect(() => {
    const nav = (localStorage.getItem("navigation") as "sidebar" | "navbar") || "sidebar"
    setNavigation(nav)

    const handler = () => {
      const updated = (localStorage.getItem("navigation") as "sidebar" | "navbar") || "sidebar"
      setNavigation(updated)
    }

    window.addEventListener("navigation-change", handler)
    return () => window.removeEventListener("navigation-change", handler)
  }, [])

  // ✅ Sync theme + theme color
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark"
    const savedColor = localStorage.getItem("theme-color") || "#3b82f6"

    document.documentElement.classList.toggle("dark", savedTheme === "dark")
    document.documentElement.style.setProperty("--color-primary", savedColor)
  }, [])

  return (
    <div className="flex h-screen bg-base text-base overflow-hidden transition-colors duration-300">
      {/* ✅ Sidebar Mode */}
      {navigation === "sidebar" && (
        <div
          className={`w-64 transition-all duration-300 ease-in-out ${
            sidebarOpen ? "ml-0" : "-ml-64"
          }`}
        >
          <Sidebar />
        </div>
      )}

      {/* ✅ Main Area */}
      <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* ✅ Navbar Mode → Sidebar tampil horizontal */}
        {navigation === "navbar" && (
          <div className="bg-card border-b border-base px-4">
            <Sidebar horizontal />
          </div>
        )}

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
