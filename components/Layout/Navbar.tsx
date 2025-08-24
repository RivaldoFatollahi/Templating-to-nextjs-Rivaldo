"use client";

import { useState, useEffect, useRef } from "react";
import {
  Menu,
  Search,
  ShoppingCart,
  Bell,
  Grid,
  Maximize2,
  SunMedium,
  Moon,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import Switcher from "@/components/Layout/switcher";

export default function Navbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [switcherOpen, setSwitcherOpen] = useState(false);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // ✅ Fullscreen toggle
  const [fullscreen, setFullscreen] = useState(false);
  const handleFullscreen = () => {
    if (!fullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullscreen(!fullscreen);
  };

// ✅ Default undefined dulu biar server & client sama
const [isDark, setIsDark] = useState<boolean | null>(null);

useEffect(() => {
  const html = document.documentElement;
  const darkMode = html.classList.contains("dark");
  setIsDark(darkMode);
}, []);

const toggleTheme = () => {
  const html = document.documentElement;
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
    setIsDark(false);
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
    setIsDark(true);
  }
};

  // ✅ Auto close if click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className="h-16 flex items-center justify-between px-4 border-b relative transition-colors duration-300
             bg-card border-base text-base"
    >
      {/* Left - Toggle + Search */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg transition-colors hover:bg-base"
        >
          <Menu size={20} />
        </button>

        {/* Dark/Light Mode Toggle */}
       <button
  onClick={toggleTheme}
  className="p-2 rounded-full transition-colors hover:bg-base border border-base"
>
  {isDark === null ? null : isDark ? (
    <SunMedium size={18} />
  ) : (
    <Moon size={18} />
  )}
</button>


        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-base"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-lg text-sm w-64 
                       bg-card text-base border border-base focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-4 relative" ref={menuRef}>
        {/* Cart */}
        <div className="relative">
          <button
            onClick={() => toggleMenu("cart")}
            className="relative p-2 rounded-full transition-colors hover:bg-base"
          >
            <ShoppingCart size={18} />
            <span className="absolute top-1 right-1 h-4 w-4 bg-orange-500 text-[10px] flex items-center justify-center rounded-full text-white font-medium">
              5
            </span>
          </button>
          {openMenu === "cart" && (
            <DropdownMenu>
              <p className="menu-item">🛒 2x Burger - $10</p>
              <p className="menu-item">🥤 1x Soda - $2</p>
              <p className="menu-item">🍟 1x Fries - $3</p>
              <button className="mt-3 w-full bg-primary hover:opacity-80 text-white py-2 rounded-lg text-sm">
                Checkout
              </button>
            </DropdownMenu>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => toggleMenu("notif")}
            className="relative p-2 rounded-full transition-colors hover:bg-base"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-[10px] flex items-center justify-center rounded-full text-white font-medium">
              6
            </span>
          </button>
          {openMenu === "notif" && (
            <DropdownMenu className="w-72">
              <p className="menu-item">🔔 New user registered</p>
              <p className="menu-item">📦 Order #1234 shipped</p>
              <p className="menu-item">💰 Payment received</p>
              <p className="menu-item">⚡ Server restarted</p>
            </DropdownMenu>
          )}
        </div>

        {/* Grid Apps */}
        <button className="p-2 rounded-full transition-colors hover:bg-base">
          <Grid size={18} />
        </button>

        {/* Fullscreen */}
        <button
          onClick={handleFullscreen}
          className="p-2 rounded-full transition-colors hover:bg-base"
        >
          <Maximize2 size={18} />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => toggleMenu("profile")}
            className="flex items-center gap-2 pl-4 border-l rounded-lg p-2 transition-colors hover:bg-base border-base"
          >
            <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-sm font-bold">
              R
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium">Rivaldo</p>
              <p className="text-xs text-base">Web Developer</p>
            </div>
          </button>
          {openMenu === "profile" && (
            <DropdownMenu className="w-48">
              <button className="menu-item flex items-center gap-2">
                <User size={14} /> Profile
              </button>
              <button className="menu-item flex items-center gap-2">
                <Settings size={14} /> Settings
              </button>
              <button className="menu-item flex items-center gap-2 text-red-400">
                <LogOut size={14} /> Logout
              </button>
            </DropdownMenu>
          )}
        </div>

        {/* Switcher Button */}
        <button
          onClick={() => setSwitcherOpen(true)}
          className="p-2 rounded-full transition-colors hover:bg-base"
        >
          <Settings size={18} />
        </button>
      </div>

      {/* ✅ Switcher Panel */}
      <Switcher open={switcherOpen} onClose={() => setSwitcherOpen(false)} />
    </header>
  );
}

function DropdownMenu({
  children,
  className = "w-64",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`absolute right-0 mt-2 ${className} rounded-xl shadow-xl p-3 text-sm animate-fadeIn transition-colors
      bg-card border border-base text-base`}
    >
      {children}
    </div>
  );
}
