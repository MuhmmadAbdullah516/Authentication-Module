import Link from "next/link";
import { auth } from "@/auth";
import { logoutAction } from "@/app/actions/auth";
import MobileMenu from "@/components/layout/MobileMenu";
import Button from "@/components/ui/Button";

export default async function Header() {
  const session = await auth();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/logo.svg"
                alt="skyvela"
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Navigation Links — hidden on mobile, visible on md+ */}
          <nav className="hidden md:flex space-x-10 text-sm font-semibold text-[#1e2550]">
            <Link href="#" className="hover:text-blue-600 transition-colors">Flights</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Hotels</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Packages</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Activities</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Transfers</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-5">

            {/* Language Selector — hidden on small screens */}
            <div className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#1e2550] cursor-pointer hover:opacity-85 transition-opacity">
              <img
                src="/Flag.svg"
                alt="ENG"
                className="w-5 h-5 rounded-full object-cover shadow-sm border border-gray-100"
              />
              <span className="hidden lg:inline">ENG</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1e2550]/80">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Auth Button — hidden on mobile (shown in mobile menu) */}
            <div className="hidden md:flex items-center gap-4">
              {session ? (
                <>
                  <span className="text-sm font-semibold text-[#1e2550] hidden lg:block">
                    Hi, {session.user?.name}
                  </span>
                  <form action={logoutAction}>
                    <Button type="submit" variant="secondary" fullWidth={false} className="px-4">
                      Sign Out
                    </Button>
                  </form>
                </>
              ) : (
                <Link href="/login">
                  <Button variant="primary" fullWidth={false} className="px-5">
                    Sign In
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu — Client Component with toggle */}
            <MobileMenu
              isLoggedIn={!!session}
              userName={session?.user?.name}
            />

          </div>
        </div>
      </div>
    </header>
  );
}
