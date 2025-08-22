"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export default function Switcher({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  if (!open) return null

  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr")
  const [navigation, setNavigation] = useState<"sidebar" | "navbar">("sidebar")

  // ✅ sync dengan localStorage saat open
  useEffect(() => {
    const nav = (localStorage.getItem("navigation") as "sidebar" | "navbar") || "sidebar"
    setNavigation(nav)
  }, [open])

  // ✅ Handler ganti direction
  const handleDirection = (dir: "ltr" | "rtl") => {
    setDirection(dir)
    document.documentElement.setAttribute("dir", dir)
  }

  // ✅ Handler ganti navigation
  const handleNavigation = (style: "sidebar" | "navbar") => {
    setNavigation(style)
    localStorage.setItem("navigation", style)

    // trigger custom event biar RootLayout tau
    window.dispatchEvent(new Event("navigation-change"))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
      <div className="w-80 bg-[#1e293b] h-full shadow-lg p-5 overflow-y-auto animate-slideIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-3">
          <h2 className="text-lg font-semibold text-white">⚙️ Switcher</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-700 transition"
          >
            <X className="text-gray-400 hover:text-white" size={18} />
          </button>
        </div>

        <Section title="Theme Color Mode">
          <div className="flex gap-3">
            <SwitcherButton
              label="Light"
              active={theme === "light"}
              onClick={() => setTheme("light")}
            />
            <SwitcherButton
              label="Dark"
              active={theme === "dark"}
              onClick={() => setTheme("dark")}
            />
          </div>
        </Section>

         <Section title="Directions">
          <div className="flex gap-3">
            <SwitcherButton
              label="LTR"
              active={direction === "ltr"}
              onClick={() => handleDirection("ltr")}
            />
            <SwitcherButton
              label="RTL"
              active={direction === "rtl"}
              onClick={() => handleDirection("rtl")}
            />
          </div>
        </Section>

         <Section title="Layout Width">
          <div className="flex gap-3">
            <SwitcherButton label="Full Width" active />
            <SwitcherButton label="Boxed" />
          </div>
        </Section>

        {/* Navigation Style */}
        <Section title="Navigation Style">
          <div className="flex gap-3">
            <SwitcherButton
              label="Sidebar"
              active={navigation === "sidebar"}
              onClick={() => handleNavigation("sidebar")}
            />
            <SwitcherButton
              label="Navbar"
              active={navigation === "navbar"}
              onClick={() => handleNavigation("navbar")}
            />
          </div>
        </Section>

         <Section title="Sidemenu Layout Styles">
          <div className="flex flex-col gap-2">
            <SwitcherButton label="Default Menu" full />
            <SwitcherButton label="Closed Menu" full />
            <SwitcherButton label="Icon Overlay" full />
          </div>
        </Section>

        {/* Reset Button */}
        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium mt-4 transition">
          Reset
        </button>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-gray-300 mb-2">{title}</p>
      {children}
    </div>
  )
}

function SwitcherButton({
  label,
  active,
  onClick,
  full,
}: {
  label: string
  active?: boolean
  onClick?: () => void
  full?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        full ? "w-full" : "px-3"
      } py-2 rounded-lg text-sm font-medium transition ${
        active
          ? "bg-blue-600 text-white"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
      }`}
    >
      {label}
    </button>
  )
}
