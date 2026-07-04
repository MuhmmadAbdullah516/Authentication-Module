import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1e2550] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand & Selectors */}
          <div className="col-span-1 md:col-span-5 pr-8">
            <Link href="/" className="flex items-center mb-6">
              <img 
                src="/logo.svg" 
                alt="skyvela" 
                className="h-10 w-auto object-contain brightness-0 invert" 
              />
            </Link>
            <p className="text-sm text-gray-300 mb-8 leading-relaxed max-w-sm">
              Your smart travel companion for flights, hotels, activities and more — across the globe.
            </p>
            
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3">Language</h4>
              <div className="flex flex-wrap gap-2">
                {["English", "বাংলা", "Français", "عربي"].map((lang) => (
                  <button key={lang} className={`px-4 py-1.5 rounded text-xs font-medium ${lang === "English" ? "bg-[#2a3470]" : "bg-[#2a3470]/50 hover:bg-[#2a3470]"} transition-colors`}>
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3">Currency</h4>
              <div className="flex flex-wrap gap-2">
                {["USD", "EUR", "GBP", "BDT", "AED"].map((curr) => (
                  <button key={curr} className={`px-4 py-1.5 rounded text-xs font-medium ${curr === "USD" ? "bg-[#2a3470]" : "bg-[#2a3470]/50 hover:bg-[#2a3470]"} transition-colors`}>
                    {curr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1 md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-sm mb-6 tracking-wider">EXPLORE</h4>
              <ul className="space-y-4 text-sm text-gray-300">
                <li><Link href="#" className="hover:text-white transition-colors">Flights</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Hotels</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Activities & Tours</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Flight + Hotel</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Airport Transfers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-6 tracking-wider">COMPANY</h4>
              <ul className="space-y-4 text-sm text-gray-300">
                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Gallery</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-6 tracking-wider">LEGAL</h4>
              <ul className="space-y-4 text-sm text-gray-300">
                <li><Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2a3470] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>Copyright © 2026 Skyvela, All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Facebook</Link>
            <Link href="#" className="hover:text-white transition-colors">Linkedin</Link>
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
