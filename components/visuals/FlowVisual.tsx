"use client";

import { motion } from "framer-motion";

// Actualités : flux de vagues qui se déforment en continu (information qui circule).
// Chaque chemin garde la même structure (40 points) pour que Framer Motion puisse l'interpoler.
const W = 400;
const STEPS = 40;

function wave(y: number, amp: number, freq: number, phase: number) {
  let d = "";
  for (let i = 0; i <= STEPS; i++) {
    const x = (i / STEPS) * W;
    const yy = y + amp * Math.sin((i / STEPS) * Math.PI * 2 * freq + phase);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${yy.toFixed(1)} `;
  }
  return d.trim();
}

const waves = [
  { y: 110, amp: 26, freq: 1.2, dur: 9, op: 0.9, w: 2, accent: false },
  { y: 160, amp: 34, freq: 1.6, dur: 12, op: 0.6, w: 1.5, accent: false },
  { y: 210, amp: 22, freq: 2.1, dur: 8, op: 0.9, w: 2, accent: true },
  { y: 260, amp: 30, freq: 1.4, dur: 14, op: 0.5, w: 1.5, accent: false },
  { y: 305, amp: 18, freq: 2.4, dur: 10, op: 0.4, w: 1, accent: false },
];

export default function FlowVisual() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full"
      aria-hidden
      // Fondu sur les bords : les vagues se dissolvent au lieu d'être coupées net.
      style={{ maskImage: "linear-gradient(to right, transparent, black 22%, black 78%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 22%, black 78%, transparent)" }}
    >
      {waves.map((w, i) => (
        <motion.path
          key={i}
          fill="none"
          strokeWidth={w.w}
          strokeLinecap="round"
          className={w.accent ? "stroke-accent" : "stroke-primary dark:stroke-[#8FA2F0]"}
          style={{ opacity: w.op }}
          initial={{ d: wave(w.y, w.amp, w.freq, 0) }}
          animate={{
            d: [
              wave(w.y, w.amp, w.freq, 0),
              wave(w.y, w.amp, w.freq, Math.PI),
              wave(w.y, w.amp, w.freq, Math.PI * 2),
            ],
          }}
          transition={{ duration: w.dur, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </svg>
  );
}
