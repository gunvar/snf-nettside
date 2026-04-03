"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-navy/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/images/logo/Logo Skudeneshavn Næringsforening_v2.PNG"
              alt="Skudeneshavn Næringsforening"
              width={52}
              height={30}
              className="h-8 w-auto brightness-0 invert"
            />
            <span className="hidden sm:block text-white/90 text-sm font-medium tracking-wide">
              Skudeneshavn
              <span className="text-gold ml-1 font-normal">Næringsforening</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-0.5">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-[13px] font-medium text-white/70 hover:text-white transition-colors rounded"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/medlemskap#bli-medlem"
              className="ml-4 bg-gold/90 text-navy px-5 py-2 rounded text-[13px] font-semibold hover:bg-gold transition-colors"
            >
              Bli medlem
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Meny"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 pb-6 pt-3 animate-fade-in">
            <div className="flex flex-col gap-0.5">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/medlemskap#bli-medlem"
                className="mt-3 bg-gold/90 text-navy px-4 py-2.5 rounded text-sm font-semibold text-center hover:bg-gold transition-colors"
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
