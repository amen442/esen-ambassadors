"use client";

import { motion } from "framer-motion";

// Apparition au scroll, jouée une seule fois. `from` choisit le style d'entrée selon la page.
const styles = {
  up: { hidden: { y: 18 }, shown: { y: 0 } },
  left: { hidden: { x: -40 }, shown: { x: 0 } },
  right: { hidden: { x: 40 }, shown: { x: 0 } },
  scale: { hidden: { scale: 0.9 }, shown: { scale: 1 } },
  // Rideau : la carte se dévoile de haut en bas
  wipe: { hidden: { clipPath: "inset(0 0 100% 0)" }, shown: { clipPath: "inset(0 0 0% 0)" } },
} as const;

export type RevealFrom = keyof typeof styles;

export default function Reveal({
  children,
  delay = 0,
  from = "up",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  from?: RevealFrom;
  className?: string;
}) {
  const s = styles[from];
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...s.hidden }}
      whileInView={{ opacity: 1, ...s.shown }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
