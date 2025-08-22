"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/Layout/Sidebar"
import Navbar from "@/components/Layout/Navbar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [navigation, setNavigation] = useState<"sidebar" | "navbar">("sidebar")

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

  return (
    <div className="flex h-screen bg-[#0f172a] text-white overflow-hidden">
      {/* ✅ Kalau Sidebar Mode */}
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

        {/* ✅ Kalau Navbar Mode → tampilkan Sidebar sebagai secondary navbar */}
        {navigation === "navbar" && (
          <div className="bg-[#1e293b] border-b border-gray-700 px-4">
            <Sidebar horizontal />
          </div>
        )}

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
