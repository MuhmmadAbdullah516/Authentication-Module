"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface MobileMenuProps {
  isLoggedIn: boolean;
  userName?: string | null;
}

export default function MobileMenu({ isLoggedIn, userName }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden relative">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[42px] h-[42px] flex items-center justify-center bg-[#fbb419] rounded-lg text-[#1e2550] hover:bg-[#e0a016] transition-colors shadow-sm"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 2H18M0 10H18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-[calc(100%+20px)] right-0 w-64 bg-white border border-gray-100 rounded-xl shadow-xl z-50">
          <div className="px-4 py-4 flex flex-col gap-1">
            {["Flights", "Hotels", "Packages", "Activities", "Transfers"].map((item) => (
              <Link
                key={item}
                href="#"
                onClick={() => setIsOpen(false)}
                className="text-[#1e2550] font-semibold text-sm py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {item}
              </Link>
            ))}

            <div className="my-2 border-t border-gray-100" />

            {isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-400 px-3">Hi, {userName}</span>
                <form action="/api/auth/signout" method="POST">
                  <Button variant="secondary">
                    Sign Out
                  </Button>
                </form>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
              >
                <Button variant="primary">
                  Sign In
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
