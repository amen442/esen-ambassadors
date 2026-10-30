"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Referme le menu mobile à chaque changement de page.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sur l'accueil, l'en-tête est transparent tant qu'on est au-dessus du hero.
  const transparent = pathname === "/" && !scrolled && !open;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        transparent ? "border-transparent bg-transparent" : "border-border bg-background/80 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Logo size={40} priority />
          <span className="font-serif text-lg font-semibold">ESEN Ambassadors</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const cta = item.href === "/contact";
            const idle = "text-muted hover:text-primary";
            const current = "font-semibold text-primary";
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  cta
                    ? "ml-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-fg transition hover:opacity-90"
                    : `rounded-full px-3 py-2 text-sm transition ${active ? current : idle}`
                }
              >
                {item.label}
              </Link>
            );
          })}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground"
          >
            <span aria-hidden>{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-border bg-background px-4 py-3 lg:hidden" aria-label="Navigation mobile">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-foreground hover:bg-surface"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
