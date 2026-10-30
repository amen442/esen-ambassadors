"use client";

import { motion } from "framer-motion";

// Événements : grille de « jours » où une vague lumineuse balaie le calendrier ; quelques dates dorées.
const COLS = 12;
const ROWS = 10;
const GAP = 32;
const gold = new Set([14, 37, 58, 81, 102]);

export default function GridVisual() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
      {Array.from({ length: COLS * ROWS }, (_, n) => {
        const c = n % COLS;
        const r = Math.floor(n / COLS);
        const x = 22 + c * GAP;
        const y = 40 + r * GAP;
        const isGold = gold.has(n);
        return (
          <motion.circle
            key={n}
            cx={x}
            cy={y}
            r={isGold ? 5 : 3}
            className={isGold ? "fill-accent" : "fill-primary dark:fill-[#8FA2F0]"}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            initial={{ opacity: 0.2, scale: 1 }}
            animate={{ opacity: isGold ? [0.5, 1, 0.5] : [0.2, 0.85, 0.2], scale: isGold ? [1, 1.8, 1] : [1, 1.9, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.2, delay: (c + r) * 0.16, ease: "easeInOut" }}
          />
        );
      })}
    </svg>
  );
}
