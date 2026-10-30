"use client";

import { motion } from "framer-motion";

// Équipe : neuf nœuds (les 9 rôles) en orbite, reliés entre eux, autour d'un centre qui pulse.
const N = 9;
const R = 150;
const C = { transformOrigin: "200px 200px" } as const;
const pts = Array.from({ length: N }, (_, i) => {
  const a = (i / N) * Math.PI * 2 - Math.PI / 2;
  return { x: 200 + R * Math.cos(a), y: 200 + R * Math.sin(a) };
});

export default function OrbitVisual() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
      <circle cx={200} cy={200} r={R} fill="none" strokeDasharray="3 7" className="stroke-primary/30 dark:stroke-[#8FA2F0]/30" />
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }} style={C}>
        {pts.map((p, i) => {
          const q = pts[(i + 3) % N];
          const n = pts[(i + 1) % N];
          return (
            <g key={i}>
              <line x1={p.x} y1={p.y} x2={n.x} y2={n.y} strokeWidth={1.2} className="stroke-primary/40 dark:stroke-[#8FA2F0]/40" />
              <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} strokeWidth={0.8} className="stroke-primary/20 dark:stroke-[#8FA2F0]/20" />
            </g>
          );
        })}
        {pts.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={9}
            className="fill-primary dark:fill-[#8FA2F0]"
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            animate={{ scale: [1, 1.35, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.33, ease: "easeInOut" }}
          />
        ))}
      </motion.g>
      <motion.g animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} style={C}>
        <circle cx={200} cy={200} r={70} fill="none" strokeDasharray="2 10" strokeWidth={2} className="stroke-accent/60" />
        <circle cx={270} cy={200} r={5} className="fill-accent" />
      </motion.g>
      <motion.circle
        cx={200}
        cy={200}
        r={14}
        className="fill-accent"
        style={C}
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}
