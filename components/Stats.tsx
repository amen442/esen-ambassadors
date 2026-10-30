"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { stats } from "@/lib/content";
import Reveal from "./Reveal";

// Compteur animé quand il entre à l'écran. Une valeur `null` (non fournie) s'affiche « — ».
function Counter({ value, suffix = "" }: { value: number | null; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || value === null) return;
    const controls = animate(0, value, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>{value === null ? "—" : `${n}${suffix}`}</span>;
}

export default function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <dl className="grid gap-4 sm:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <div className="rounded-2xl border border-border bg-surface p-8 text-center">
              <dd className="bg-gradient-to-br from-primary to-[#8FA2F0] bg-clip-text font-serif text-5xl font-bold text-transparent">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
              <dt className="mt-2 text-sm uppercase tracking-wider text-muted">{s.label}</dt>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
