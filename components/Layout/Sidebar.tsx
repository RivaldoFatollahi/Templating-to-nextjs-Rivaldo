"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Grid,
  Layers,
  Shield,
  FileText,
  Clock,
  Image as ImageIcon,
  Bell,
  Folder,
  BarChart3,
  Users,
  Settings,
  ChevronRight,
} from "lucide-react"

type MenuItem = {
  label: string
  icon?: React.ReactNode
  href?: string
  children?: MenuItem[]
}

const menu: { section: string; items: MenuItem[] }[] = [
  {
    section: "MAIN",
    items: [
      {
        label: "Dashboards",
        icon: <Home size={16} />,
        children: [
          { label: "Dashboard-1", href: "/dashboard-1" },
          { label: "Dashboard-2", href: "/dashboard-2" },
          { label: "Dashboard-3", href: "/dashboard-3" },
        ],
      },
    ],
  },
  {
    section: "WEB APPS",
    items: [
      { label: "Apps", icon: <Grid size={16} />, href: "/apps" },
      { label: "Elements", icon: <Layers size={16} />, href: "/elements" },
      { label: "Advanced UI", icon: <Shield size={16} />, href: "/advanced-ui" },
    ],
  },
  {
    section: "PAGES",
    items: [
      { label: "Pages", icon: <FileText size={16} />, href: "/pages" },
      { label: "Utilities", icon: <Clock size={16} />, href: "/utilities" },
    ],
  },
  {
    section: "GENERAL",
    items: [
      { label: "Icons", icon: <ImageIcon size={16} />, href: "/icons" },
      { label: "Charts", icon: <BarChart3 size={16} />, href: "/charts" },
    ],
  },
  {
    section: "MULTI LEVEL",
    items: [{ label: "Menu-levels", icon: <Folder size={16} />, href: "/menu" }],
  },
  {
    section: "COMPONENTS",
    items: [
      { label: "Forms", icon: <Users size={16} />, href: "/forms" },
      { label: "Tables", icon: <Bell size={16} />, href: "/tables" },
      { label: "Widgets", icon: <Settings size={16} />, href: "/widgets" },
      { label: "Maps", icon: <Folder size={16} />, href: "/maps" },
    ],
  },
]

export default function Sidebar() {
  const [open, setOpen] = useState<string | null>(null)
  const pathname = usePathname()

  return (
    <aside className="h-screen bg-[#1e293b] text-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-r border-gray-700">
        <h1 className="text-lg font-bold tracking-wide">Dashboard</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto no-scrollbar px-3 py-4 space-y-6">
        {menu.map((section, i) => (
          <div key={i}>
            <p className="text-xs font-semibold text-gray-500 mb-2 px-2 uppercase">
              {section.section}
            </p>
            <div className="space-y-1">
              {section.items.map((item, j) =>
                item.children ? (
                  <div key={j}>
                    <button
                      onClick={() =>
                        setOpen(open === item.label ? null : item.label)
                      }
                      className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-700"
                    >
                      <span className="flex items-center gap-2">
                        {item.icon}
                        {item.label}
                      </span>
                      <ChevronRight
                        size={14}
                        className={`transition-transform ${
                          open === item.label ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    {open === item.label && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.children.map((child, k) => (
                          <Link
                            key={k}
                            href={child.href!}
                            className={`block px-2 py-1 text-sm rounded-md ${
                              pathname === child.href
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-700"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={j}
                    href={item.href || "#"}
                    className={`flex items-center gap-2 p-2 rounded-lg ${
                      pathname === item.href
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer kecil */}
      <div className="p-4 border-t border-gray-700 text-xs text-gray-500">
        © 2025 My Dashboard
      </div>
    </aside>
  )
}
