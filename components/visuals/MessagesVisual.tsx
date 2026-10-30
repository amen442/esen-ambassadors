"use client";

import { motion } from "framer-motion";

// Contact : bulles de conversation qui flottent, avec un indicateur de saisie animé.
function Float({ children, className, dur, y = 14, delay = 0 }: { children: React.ReactNode; className: string; dur: number; y?: number; delay?: number }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{ y: [0, -y, 0] }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export default function MessagesVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <motion.div
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 dark:border-[#8FA2F0]/30"
        animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
      />
      <Float className="left-[6%] top-[14%] w-[58%]" dur={6}>
        <div className="rounded-2xl rounded-bl-sm border border-border bg-surface p-4 shadow-lg shadow-primary/10">
          <div className="h-2 w-4/5 rounded-full bg-muted/40" />
          <div className="mt-2 h-2 w-3/5 rounded-full bg-muted/30" />
        </div>
      </Float>
      <Float className="right-[4%] top-[42%] w-[56%]" dur={7.5} y={18} delay={0.8}>
        <div className="rounded-2xl rounded-br-sm bg-primary p-4 shadow-lg shadow-primary/30">
          <div className="h-2 w-full rounded-full bg-primary-fg/70" />
          <div className="mt-2 h-2 w-2/3 rounded-full bg-primary-fg/50" />
        </div>
      </Float>
      <Float className="left-[12%] bottom-[10%]" dur={5} y={10} delay={1.4}>
        <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-border bg-surface px-4 py-3 shadow-lg shadow-primary/10">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-accent"
              animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.16 }}
            />
          ))}
        </div>
      </Float>
    </div>
  );
}
