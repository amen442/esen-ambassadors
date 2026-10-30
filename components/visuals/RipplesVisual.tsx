"use client";

import { motion } from "framer-motion";

// À propos : ondes concentriques qui rayonnent depuis un point (rayonnement, mission), étoiles en orbite.
const C = { transformOrigin: "200px 200px" } as const;

export default function RipplesVisual() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <motion.circle
          key={i}
          cx={200}
          cy={200}
          r={36}
          fill="none"
          strokeWidth={1.5}
          className="stroke-primary dark:stroke-[#8FA2F0]"
          style={C}
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: [1, 5.2], opacity: [0.7, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: i * 1.25, ease: "easeOut" }}
        />
      ))}
      <circle cx={200} cy={200} r={34} className="fill-primary/10 stroke-primary/40 dark:fill-[#8FA2F0]/10 dark:stroke-[#8FA2F0]/40" />
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} style={C}>
        {[0, 120, 240].map((a) => (
          <g key={a} transform={`rotate(${a} 200 200)`}>
            <text x={200} y={72} textAnchor="middle" fontSize={20} className="fill-accent">★</text>
          </g>
        ))}
      </motion.g>
      <motion.circle
        cx={200}
        cy={200}
        r={8}
        className="fill-accent"
        style={C}
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}
