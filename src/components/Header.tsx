"use client";

import Link from "next/link";
import { useState } from "react";

const navigation = [
  { name: "Hjem", href: "/" },
  { name: "Om oss", href: "/om-oss" },
  { name: "Hva vi jobber med", href: "/pilarer" },
  { name: "Aktuelt", href: "/aktuelt" },
  { name: "Arrangementer", href: "/arrangementer" },
  { name: "Medlemskap", href: "/medlemskap" },
  { name: "Kontakt", href: "/kontakt" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-navy text-white sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight tracking-tight">
                Skudeneshavn
              </span>
              <span className="text-xs font-medium text-gold tracking-widest uppercase">
                Næringsforening
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/medlemskap#bli-medlem"
              className="ml-3 bg-gold text-navy px-4 py-2 rounded-md text-sm font-semibold hover:bg-gold-light transition-colors"
            >
              Bli medlem
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-white/80 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Meny"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 py-4">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/medlemskap#bli-medlem"
                className="mt-2 bg-gold text-navy px-4 py-2.5 rounded-md text-sm font-semibold text-center hover:bg-gold-light transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Bli medlem
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
