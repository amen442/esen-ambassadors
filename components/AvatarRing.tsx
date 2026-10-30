"use client";

import { motion } from "framer-motion";

// Anneau dégradé qui tourne autour de l'avatar.
export default function AvatarRing({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-[104px] w-[104px] items-center justify-center">
      <motion.span
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgb(var(--primary)),rgb(var(--accent)),transparent_60%,rgb(var(--primary)))]"
      />
      <span aria-hidden className="absolute inset-[3px] rounded-full bg-surface" />
      <div className="relative">{children}</div>
    </div>
  );
}
