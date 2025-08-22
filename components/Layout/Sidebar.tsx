"use client"

export default function Sidebar({ horizontal = false }: { horizontal?: boolean }) {
  const menus = [
    { label: "Dashboard" },
    { label: "Apps" },
    { label: "Elements" },
    { label: "Advanced UI" },
    { label: "Pages" },
    { label: "Utilities" },
    { label: "Icons" },
    { label: "Charts" },
    { label: "Menu-levels" },
  ]

  if (horizontal) {
    return (
      <nav className="flex gap-6 py-2">
        {menus.map((menu, i) => (
          <button
            key={i}
            className="text-gray-300 hover:text-white transition text-sm font-medium"
          >
            {menu.label}
          </button>
        ))}
      </nav>
    )
  }

  return (
    <aside className="h-full bg-[#1e293b] p-4 space-y-4">
      {menus.map((menu, i) => (
        <button
          key={i}
          className="block w-full text-left text-gray-300 hover:text-white transition"
        >
          {menu.label}
        </button>
      ))}
    </aside>
  )
}
