"use client";

import { useRef } from "react";

// Carte avec halo lumineux qui suit le curseur (variables CSS --x / --y).
// `className` s'applique à la carte, `innerClassName` au conteneur du contenu (flex, centrage, etc.).
export default function SpotlightCard({
  children,
  className = "",
  innerClassName = "",
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgb(var(--primary) / 0.16), transparent 70%)",
        }}
      />
      <div className={`relative h-full ${innerClassName}`}>{children}</div>
    </div>
  );
}
