"use client"

import "../globals.css"
import { useState } from "react"
import Sidebar from "@/components/Layout/Sidebar"
import Navbar from "@/components/Layout/Navbar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <html lang="en">
      <body className="flex h-screen bg-[#0f172a] text-white overflow-hidden">
        {/* Sidebar with animation */}
        <div
          className={`w-64 transition-all duration-300 ease-in-out ${
            sidebarOpen ? "ml-0" : "-ml-64"
          }`}
        >
          <Sidebar />
        </div>

        {/* Main content, ikut melebar kalau sidebar nutup */}
        <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}

