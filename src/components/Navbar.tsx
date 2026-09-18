"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/store/cart";

const LINKS = [
  { label: "Shop", href: "#shop" },
  { label: "The Taste", href: "#taste" },
  { label: "Collections", href: "#mixbox" },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const toggleCart = useCart((s) => s.toggle);
  const count = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        solid ? "bg-ink/85 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <nav className="container-edit flex items-center justify-between h-[74px]">
        <a
          href="#top"
          className="font-display text-xl tracking-tight text-cream"
          style={{ letterSpacing: "0.02em" }}
        >
          Could Crunch
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[0.78rem] uppercase tracking-[0.14em] text-cream/75 hover:text-cream transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={toggleCart}
          className="relative flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.14em] text-cream/90 hover:text-amber-soft transition-colors"
          aria-label="Open cart"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 8h12l-1.2 11a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 8Z"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <span className="hidden sm:inline">Cart</span>
          {count > 0 && (
            <span className="absolute -top-2 -right-3 flex items-center justify-center w-4 h-4 rounded-full bg-amber text-cream text-[0.6rem] font-semibold">
              {count}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}
