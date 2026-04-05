"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const navigation = [
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileMenuOpen
          ? "bg-navy-dark/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <Image
              src="/images/logo/snf-logo.png"
              alt="Skudeneshavn Næringsforening"
              width={44}
              height={26}
              className="h-7 w-auto"
            />
            <div className="hidden sm:block text-[13px] leading-tight">
              <span className="text-white/80 font-medium tracking-wide">
                Skudeneshavn
              </span>
              <br />
              <span className="text-gold/60 text-[11px] tracking-widest uppercase">
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
                className="px-3.5 py-2 text-[13px] text-white/55 hover:text-white transition-colors tracking-wide"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/medlemskap"
              className="ml-6 bg-gold text-navy px-5 py-2 text-[12px] font-semibold uppercase tracking-wider hover:bg-gold-light transition-colors"
            >
              Bli medlem
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-white/60 hover:text-white transition-colors"
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
          <div className="lg:hidden pb-8 pt-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-2 py-3 text-[15px] text-white/60 hover:text-white border-b border-white/5 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/medlemskap"
                className="mt-6 bg-gold text-navy px-6 py-3 text-[13px] font-semibold text-center uppercase tracking-wider hover:bg-gold-light transition-colors"
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
