"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";   // ✅ penting

export default function Sidebar({
  horizontal = false,
}: {
  horizontal?: boolean;
}) {
  const [active, setActive] = useState("Dashboard");
  const [open, setOpen] = useState<string | null>(null);

  const menus = [
    {
      label: "Dashboard",
      children: ["Dashboard-1", "Dashboard-2", "Dashboard-3"],
    },
    { label: "Apps", children: ["Mail", "Chat", "Calendar"] },
    { label: "Elements", children: ["Buttons", "Cards", "Modals"] },
    { label: "Advanced UI", children: ["Charts", "Tables"] },
    { label: "Pages", children: ["Profile", "Settings"] },
    { label: "Utilities", children: ["Colors", "Spacing"] },
    { label: "Icons" },
    { label: "Charts" },

    // ✅ Tambahin menu Sarpras langsung ke /sarpras
    { label: "Sarpras", path: "/Sarpras" },

    { label: "Menu-levels", children: ["Level 1", "Level 2"] },
  ];

  // 🔹 Horizontal Navbar
  if (horizontal) {
    return (
      <nav className="flex items-center justify-between h-14 bg-card border-b border-base px-6">
        <h1 className="font-bold text-base text-lg">My Dashboard</h1>
        <div className="flex gap-6 items-center">
          {menus.map((menu, i) => (
            <div key={i} className="relative group">
              {menu.path ? (
                <Link
                  href={menu.path}
                  className={cn(
                    "transition text-sm font-medium hover:text-primary relative flex items-center gap-1 text-base",
                    active === menu.label && "text-primary"
                  )}
                  onClick={() => setActive(menu.label)}
                >
                  {menu.label}
                </Link>
              ) : (
                <button
                  onClick={() => setActive(menu.label)}
                  className={cn(
                    "transition text-sm font-medium hover:text-primary relative flex items-center gap-1 text-base",
                    active === menu.label && "text-primary"
                  )}
                >
                  {menu.label}
                  {menu.children && <ChevronDown size={14} />}
                </button>
              )}

              {/* Dropdown */}
              {menu.children && (
                <div className="absolute top-full left-0 hidden group-hover:block bg-card border border-base rounded-lg mt-2 shadow-lg animate-fadeIn">
                  <ul className="p-2 space-y-1 text-sm">
                    {menu.children.map((child, j) => (
                      <li
                        key={j}
                        className="px-3 py-1 hover:bg-base rounded cursor-pointer"
                      >
                        {child}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    );
  }

  // 🔹 Vertical Sidebar
  return (
    <aside className="h-full w-64 bg-card border-r border-base p-4 flex flex-col gap-2">
      <h1 className="font-bold text-base text-lg px-2 my-2">My Dashboard</h1>
      {menus.map((menu, i) => (
        <div key={i}>
          {menu.path ? (
            <Link
              href={menu.path}
              onClick={() => setActive(menu.label)}
              className={cn(
                "flex w-full py-2 px-3 rounded-lg transition font-medium text-sm mt-1",
                active === menu.label
                  ? "bg-primary text-white"
                  : "text-app hover:bg-primary/10 hover:text-primary"
              )}
            >
              {menu.label}
            </Link>
          ) : (
            <button
              onClick={() =>
                menu.children
                  ? setOpen(open === menu.label ? null : menu.label)
                  : setActive(menu.label)
              }
              className={cn(
                "flex w-full justify-between items-center py-2 px-3 rounded-lg transition font-medium text-sm mt-1",
                active === menu.label
                  ? "bg-primary text-white"
                  : "text-app hover:bg-primary/10 hover:text-primary"
              )}
            >
              {menu.label}
              {menu.children && (
                <ChevronDown
                  size={16}
                  className={cn(
                    "transition-transform",
                    open === menu.label && "rotate-180"
                  )}
                />
              )}
            </button>
          )}

          {menu.children && open === menu.label && (
            <ul className="ml-4 mt-1 space-y-1 text-sm">
              {menu.children.map((child, j) => (
                <li
                  key={j}
                  className="px-2 py-1 rounded hover:text-primary cursor-pointer text-base"
                >
                  {child}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </aside>
  );
}
