"use client";

import { motion } from "framer-motion";

// Trait qui se dessine de gauche à droite quand il entre à l'écran.
export default function DrawLine({ className = "" }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className={`block origin-left ${className}`}
    />
  );
}
