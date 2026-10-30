"use client";

import { motion } from "framer-motion";

// Encadré « à venir » : bordure en pointillés qui défile en continu.
export default function DashedBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl p-6 text-muted">
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <motion.rect
          x={0.5}
          y={0.5}
          width="calc(100% - 1px)"
          height="calc(100% - 1px)"
          rx={16}
          fill="none"
          strokeWidth={1.5}
          strokeDasharray="6 8"
          className="stroke-primary/50 dark:stroke-[#8FA2F0]/50"
          animate={{ strokeDashoffset: [0, -28] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
}
