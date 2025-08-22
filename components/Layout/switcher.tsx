"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function Switcher({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null

  const [theme, setTheme] = useState<"light" | "dark">("dark")

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
      <div className="w-80 bg-[#1e293b] h-full shadow-lg p-4 overflow-y-auto animate-slideIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Switcher</h2>
          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Theme Mode */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-300 mb-2">Theme Color Mode</p>
          <div className="space-x-3">
            <button
              onClick={() => setTheme("light")}
              className={`px-3 py-1 rounded-lg ${
                theme === "light" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`px-3 py-1 rounded-lg ${
                theme === "dark" ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
              }`}
            >
              Dark
            </button>
          </div>
        </div>

        {/* Layout Width */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-300 mb-2">Layout Width</p>
          <div className="space-x-3">
            <button className="px-3 py-1 bg-blue-600 rounded-lg">Full Width</button>
            <button className="px-3 py-1 bg-gray-700 rounded-lg">Boxed</button>
          </div>
        </div>

        {/* Menu Style */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-300 mb-2">Sidemenu Layout Styles</p>
          <div className="flex flex-col gap-2">
            <button className="px-3 py-1 bg-gray-700 rounded-lg">Default Menu</button>
            <button className="px-3 py-1 bg-gray-700 rounded-lg">Closed Menu</button>
            <button className="px-3 py-1 bg-gray-700 rounded-lg">Icon Overlay</button>
          </div>
        </div>

        {/* Reset Button */}
        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg">
          Reset
        </button>
      </div>
    </div>
  )
}
