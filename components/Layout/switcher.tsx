"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export default function Switcher({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr")
  const [navigation, setNavigation] = useState<"sidebar" | "navbar">("sidebar")

  const setThemeVar = (name: string, value: string) => {
    document.documentElement.style.setProperty(name, value)
    localStorage.setItem(name, value)
  }

  // ✅ Restore pas panel kebuka
  useEffect(() => {
    if (!open) return

    const nav = (localStorage.getItem("navigation") as "sidebar" | "navbar") || "sidebar"
    setNavigation(nav)

    const savedTheme = (localStorage.getItem("theme") as "light" | "dark") || "dark"
    setTheme(savedTheme)
    document.documentElement.classList.toggle("dark", savedTheme === "dark")

    const savedDir = (localStorage.getItem("direction") as "ltr" | "rtl") || "ltr"
    setDirection(savedDir)
    document.documentElement.setAttribute("dir", savedDir)

    // ✅ restore semua var
    const keys = ["--color-primary", "--color-menu", "--color-header", "--color-bg"]
    keys.forEach((k) => {
      const val = localStorage.getItem(k)
      if (val) document.documentElement.style.setProperty(k, val)
    })
  }, [open])

  // ✅ Theme Mode
  const handleTheme = (mode: "light" | "dark") => {
    setTheme(mode)
    localStorage.setItem("theme", mode)
    document.documentElement.classList.toggle("dark", mode === "dark")
  }

  // ✅ RTL / LTR
  const handleDirection = (dir: "ltr" | "rtl") => {
    setDirection(dir)
    localStorage.setItem("direction", dir)
    document.documentElement.setAttribute("dir", dir)
  }

  // ✅ Sidebar / Navbar
  const handleNavigation = (style: "sidebar" | "navbar") => {
    setNavigation(style)
    localStorage.setItem("navigation", style)
    window.dispatchEvent(new Event("navigation-change"))
  }

  // ✅ Warna primary
  const handleThemeColor = (color: string) => {
    setThemeVar("--color-primary", color)
  }

  const handleReset = () => {
    localStorage.clear()
    document.documentElement.classList.remove("dark")
    document.documentElement.setAttribute("dir", "ltr")

    // default warna
    setThemeVar("--color-primary", "#3b82f6")
    setThemeVar("--color-menu", "#1e293b")
    setThemeVar("--color-header", "#ffffff")
    setThemeVar("--color-bg", "#f8fafc")

    window.dispatchEvent(new Event("navigation-change"))
    location.reload()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex justify-end z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="w-80 bg-card h-full shadow-lg p-5 overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-base pb-3">
              <h2 className="text-lg font-semibold text-base">⚙️ Switcher</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition">
                <X className="text-muted" size={18} />
              </button>
            </div>

            {/* ✅ Theme Mode */}
            <Section title="Theme Mode">
              <div className="flex gap-3">
                <SwitcherButton label="Light" active={theme === "light"} onClick={() => handleTheme("light")} />
                <SwitcherButton label="Dark" active={theme === "dark"} onClick={() => handleTheme("dark")} />
              </div>
            </Section>

            {/* ✅ Theme Color */}
            <Section title="Theme Primary">
              <div className="flex gap-2">
                <ColorButton color="#3b82f6" onClick={handleThemeColor} />
                <ColorButton color="#ef4444" onClick={handleThemeColor} />
                <ColorButton color="#22c55e" onClick={handleThemeColor} />
                <ColorButton color="#a855f7" onClick={handleThemeColor} />
                <ColorButton color="#f59e0b" onClick={handleThemeColor} />
              </div>
            </Section>

            {/* ✅ Directions */}
            <Section title="Directions">
              <div className="flex gap-3">
                <SwitcherButton label="LTR" active={direction === "ltr"} onClick={() => handleDirection("ltr")} />
                <SwitcherButton label="RTL" active={direction === "rtl"} onClick={() => handleDirection("rtl")} />
              </div>
            </Section>

            {/* ✅ Navigation Style */}
            <Section title="Navigation Style">
              <div className="flex gap-3">
                <SwitcherButton label="Sidebar" active={navigation === "sidebar"} onClick={() => handleNavigation("sidebar")} />
                <SwitcherButton label="Navbar" active={navigation === "navbar"} onClick={() => handleNavigation("navbar")} />
              </div>
            </Section>

            {/* ✅ Extra Color Settings */}
            <Section title="More Colors">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted mb-1">Menu Colors:</p>
                  <div className="flex gap-2 flex-wrap">
                    <ColorButton color="#1e293b" onClick={() => setThemeVar("--color-menu", "#1e293b")} />
                    <ColorButton color="#111827" onClick={() => setThemeVar("--color-menu", "#111827")} />
                    <ColorButton color="#22c55e" onClick={() => setThemeVar("--color-menu", "#22c55e")} />
                    <ColorButton color="#f97316" onClick={() => setThemeVar("--color-menu", "#f97316")} />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted mb-1">Header Colors:</p>
                  <div className="flex gap-2 flex-wrap">
                    <ColorButton color="#ffffff" onClick={() => setThemeVar("--color-header", "#ffffff")} />
                    <ColorButton color="#0f172a" onClick={() => setThemeVar("--color-header", "#0f172a")} />
                    <ColorButton color="#3b82f6" onClick={() => setThemeVar("--color-header", "#3b82f6")} />
                    <ColorButton color="#f59e0b" onClick={() => setThemeVar("--color-header", "#f59e0b")} />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted mb-1">Background:</p>
                  <div className="flex gap-2 flex-wrap">
                    <ColorButton color="#f8fafc" onClick={() => setThemeVar("--color-bg", "#f8fafc")} />
                    <ColorButton color="#0f172a" onClick={() => setThemeVar("--color-bg", "#0f172a")} />
                    <ColorButton color="#1e293b" onClick={() => setThemeVar("--color-bg", "#1e293b")} />
                    <ColorButton color="#047857" onClick={() => setThemeVar("--color-bg", "#047857")} />
                  </div>
                </div>
              </div>
            </Section>

            {/* ✅ Reset */}
            <button
              onClick={handleReset}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium mt-4 transition"
            >
              Reset
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-muted mb-2">{title}</p>
      {children}
    </div>
  )
}

function SwitcherButton({ label, active, onClick, full }: { label: string; active?: boolean; onClick?: () => void; full?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`${full ? "w-full" : "px-3"} py-2 rounded-lg text-sm font-medium transition ${
        active ? "bg-primary text-white" : "bg-muted text-base hover:bg-base"
      }`}
    >
      {label}
    </button>
  )
}

function ColorButton({ color, onClick }: { color: string; onClick: (c: string) => void }) {
  return <button onClick={() => onClick(color)} className="w-8 h-8 rounded-full border border-base" style={{ backgroundColor: color }} />
}
