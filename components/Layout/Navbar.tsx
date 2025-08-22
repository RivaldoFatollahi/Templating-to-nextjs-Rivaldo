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

  // ✅ Dark/Light Mode (LOCAL ke Navbar aja)
  const [darkMode, setDarkMode] = useState(true);

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
      className={`h-16 flex items-center justify-between px-4 border-b relative transition-colors duration-300
      ${darkMode ? "bg-[#1e293b] border-gray-700 text-gray-300" : "bg-white border-gray-200 text-gray-700"}`}
    >
      {/* Left - Toggle + Search */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-lg transition-colors ${
            darkMode
              ? "hover:bg-gray-700 text-gray-300"
              : "hover:bg-gray-200 text-gray-700"
          }`}
        >
          <Menu size={20} />
        </button>

        <div className="relative">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            className={`pl-10 pr-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-64 transition-colors
            ${
              darkMode
                ? "bg-[#5a7ccb] text-gray-200 placeholder-gray-400"
                : "bg-gray-100 text-gray-800 placeholder-gray-500"
            }`}
          />
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-4 relative" ref={menuRef}>
        {/* Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full transition-colors ${
            darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-700"
          }`}
        >
          {darkMode ? <SunMedium size={18} /> : <Moon size={18} />}
        </button>

        {/* Cart */}
        <div className="relative">
          <button
            onClick={() => toggleMenu("cart")}
            className={`relative p-2 rounded-full transition-colors ${
              darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-700"
            }`}
          >
            <ShoppingCart size={18} />
            <span className="absolute top-1 right-1 h-4 w-4 bg-orange-500 text-[10px] flex items-center justify-center rounded-full text-white font-medium">
              5
            </span>
          </button>
          {openMenu === "cart" && (
            <DropdownMenu darkMode={darkMode}>
              <p className="menu-item">🛒 2x Burger - $10</p>
              <p className="menu-item">🥤 1x Soda - $2</p>
              <p className="menu-item">🍟 1x Fries - $3</p>
              <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm">
                Checkout
              </button>
            </DropdownMenu>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => toggleMenu("notif")}
            className={`relative p-2 rounded-full transition-colors ${
              darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-700"
            }`}
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-[10px] flex items-center justify-center rounded-full text-white font-medium">
              6
            </span>
          </button>
          {openMenu === "notif" && (
            <DropdownMenu className="w-72" darkMode={darkMode}>
              <p className="menu-item">🔔 New user registered</p>
              <p className="menu-item">📦 Order #1234 shipped</p>
              <p className="menu-item">💰 Payment received</p>
              <p className="menu-item">⚡ Server restarted</p>
            </DropdownMenu>
          )}
        </div>

        {/* Grid Apps */}
        <button
          className={`p-2 rounded-full transition-colors ${
            darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-700"
          }`}
        >
          <Grid size={18} />
        </button>

        {/* Fullscreen */}
        <button
          onClick={handleFullscreen}
          className={`p-2 rounded-full transition-colors ${
            darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-700"
          }`}
        >
          <Maximize2 size={18} />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => toggleMenu("profile")}
            className={`flex items-center gap-2 pl-4 border-l rounded-lg p-2 transition-colors ${
              darkMode
                ? "border-gray-700 hover:bg-gray-700 text-gray-300"
                : "border-gray-200 hover:bg-gray-200 text-gray-700"
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-sm font-bold">
              R
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium">Rivaldo</p>
              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Web Developer
              </p>
            </div>
          </button>
          {openMenu === "profile" && (
            <DropdownMenu className="w-48" darkMode={darkMode}>
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
          className={`p-2 rounded-full transition-colors ${
            darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-700"
          }`}
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
  darkMode,
}: {
  children: React.ReactNode;
  className?: string;
  darkMode: boolean;
}) {
  return (
    <div
      className={`absolute right-0 mt-2 ${className} rounded-xl shadow-xl p-3 text-sm animate-fadeIn transition-colors
      ${
        darkMode
          ? "bg-[#1e293b] border border-gray-700 text-gray-200"
          : "bg-white border border-gray-200 text-gray-800"
      }`}
    >
      {children}
    </div>
  );
}
