"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, User, Settings, LogOut, Menu, X } from "lucide-react";
import { logoutAction } from "@/app/actions/auth";
import Button from "@/components/ui/Button";

interface DashboardNavProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export default function DashboardNav({ user }: DashboardNavProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Common Nav links markup to keep it DRY
  const navLinks = (
    <>
      <Link
        href="/dashboard"
        onClick={() => setIsDrawerOpen(false)}
        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/15 transition-colors"
      >
        <Home className="w-5 h-5 text-[#fbb419]" />
        Dashboard
      </Link>
      <Link
        href="#"
        onClick={() => setIsDrawerOpen(false)}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 font-medium hover:bg-white/5 hover:text-white transition-colors"
      >
        <User className="w-5 h-5" />
        My Profile
      </Link>
      <Link
        href="#"
        onClick={() => setIsDrawerOpen(false)}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 font-medium hover:bg-white/5 hover:text-white transition-colors"
      >
        <Settings className="w-5 h-5" />
        Settings
      </Link>
    </>
  );

  // Common User Info & Logout markup
  const userInfo = (
    <div className="p-4 border-t border-white/10">
      <div className="flex items-center gap-3 mb-4 px-2">
        <div className="w-10 h-10 rounded-full bg-[#fbb419] flex items-center justify-center font-bold text-[#1e2550] flex-shrink-0">
          {user?.name?.[0]?.toUpperCase() || "U"}
        </div>
        <div className="truncate">
          <p className="font-semibold text-sm truncate">{user?.name || "User"}</p>
          <p className="text-xs text-white/60 truncate">{user?.email}</p>
        </div>
      </div>
      
      <form action={logoutAction}>
        <Button variant="danger" type="submit">
          <LogOut className="w-5 h-5" />
          Sign Out
        </Button>
      </form>
    </div>
  );

  return (
    <>
      {/* 1. Permanent Sidebar for Desktop Viewports (>= lg) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-[#1e2550] text-white shadow-xl flex-shrink-0">
        {/* Brand Logo */}
        <div className="flex items-center h-20 px-6 border-b border-white/10">
          <Link href="/" className="flex items-center">
            <img 
              src="/logo.svg" 
              alt="skyvela" 
              className="h-10 w-auto object-contain brightness-0 invert" 
            />
          </Link>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navLinks}
        </nav>

        {/* User Info & Logout */}
        {userInfo}
      </aside>

      {/* 2. Top Header for Mobile/Tablet Viewports (< lg) */}
      <header className="lg:hidden flex items-center justify-between h-16 bg-[#1e2550] text-white px-6 w-full flex-shrink-0 z-30 shadow-md">
        {/* Hamburger Menu Toggle */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="p-1 -ml-1 text-white hover:text-white/80 focus:outline-none"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Brand Logo */}
        <Link href="/" className="flex items-center">
          <img 
            src="/logo.svg" 
            alt="skyvela" 
            className="h-8 w-auto object-contain brightness-0 invert" 
          />
        </Link>
        
        {/* Sign Out Shortcut */}
        <form action={logoutAction}>
          <Button variant="danger" fullWidth={false} type="submit" className="px-2 py-1">
            <LogOut className="w-5 h-5" />
          </Button>
        </form>
      </header>

      {/* 3. Slide-out Drawer Overlay Backdrop (< lg) */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* 4. Slide-out Drawer Sidebar Panel (< lg) */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1e2550] text-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Logo & Close Button */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-white/10">
          <Link href="/" className="flex items-center" onClick={() => setIsDrawerOpen(false)}>
            <img 
              src="/logo.svg" 
              alt="skyvela" 
              className="h-10 w-auto object-contain brightness-0 invert" 
            />
          </Link>
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="p-1 text-white/60 hover:text-white focus:outline-none"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navLinks}
        </nav>

        {/* User Info & Logout */}
        {userInfo}
      </aside>
    </>
  );
}
