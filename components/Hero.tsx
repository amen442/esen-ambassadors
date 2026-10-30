"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { hero } from "@/lib/content";
import Constellation from "./Constellation";
import Magnetic from "./Magnetic";

// Le hero suit le thème : fond clair en mode clair, nuit bleue en mode sombre.
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  // Projecteur qui suit le curseur (couleur et intensité via --spot / --spot-alpha)
  const spot = useMotionTemplate`radial-gradient(520px circle at calc(${mx} * 100%) calc(${my} * 100%), rgb(var(--spot) / var(--spot-alpha)), transparent 65%)`;

  // Inclinaison 3D du logo
  const rx = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 120, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  const words = hero.title.split(" ");

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      className="relative -mt-16 overflow-hidden bg-[#F1F4FC] pt-16 text-foreground dark:bg-[#070B1A]"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(39,57,145,0.14),transparent_55%),radial-gradient(ellipse_at_100%_100%,rgba(184,131,47,0.16),transparent_45%)] dark:bg-[radial-gradient(ellipse_at_20%_0%,rgba(39,57,145,0.55),transparent_55%),radial-gradient(ellipse_at_100%_100%,rgba(212,162,76,0.12),transparent_45%)]"
      />
      <motion.div aria-hidden className="absolute inset-0" style={{ background: spot }} />
      <Constellation className="absolute inset-0 h-full w-full" />

      <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-3 rounded-full border border-border bg-surface/70 px-4 py-1.5 text-sm text-muted backdrop-blur"
          >
            <span aria-hidden className="text-accent">★★★</span>
            {hero.eyebrow}
          </motion.p>

          <h1 className="text-balance font-serif text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: "0.5em", filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: "easeOut" }}
                className={`mr-[0.25em] inline-block ${
                  word.toLowerCase() === "ambassadeurs"
                    ? "bg-gradient-to-r from-primary via-[#5B73E8] to-accent bg-clip-text text-transparent dark:from-[#8FA2F0] dark:via-white dark:to-[#E6B866]"
                    : ""
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-6 max-w-xl text-lg text-muted"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Magnetic>
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3.5 font-medium text-primary-fg shadow-lg shadow-primary/30 dark:bg-white dark:text-[#0A0E1F]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full dark:via-accent/40"
                />
                <span className="relative">Nous rejoindre</span>
                <span aria-hidden className="relative transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/a-propos"
                className="inline-flex rounded-full border border-primary/30 bg-surface/60 px-7 py-3.5 font-medium text-foreground backdrop-blur transition hover:border-primary hover:bg-surface dark:border-white/25 dark:bg-transparent dark:hover:bg-white/10"
              >
                En savoir plus
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="relative mx-auto w-64 sm:w-80 md:w-full md:max-w-md"
          style={{ perspective: 900 }}
        >
          {/* Anneau lumineux rotatif */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-8%] rounded-full bg-[conic-gradient(from_0deg,rgba(39,57,145,0),rgba(39,57,145,0.28),rgba(184,131,47,0.3),rgba(39,57,145,0))] blur-2xl dark:bg-[conic-gradient(from_0deg,rgba(91,115,232,0),rgba(91,115,232,0.55),rgba(230,184,102,0.45),rgba(91,115,232,0))]"
          />
          <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/logo.webp"
                alt="Logo ESEN Ambassadors"
                width={953}
                height={1024}
                priority
                className="relative block h-auto w-full drop-shadow-[0_12px_30px_rgba(39,57,145,0.25)] dark:hidden"
              />
              <Image
                src="/images/logo-light.webp"
                alt="Logo ESEN Ambassadors"
                width={953}
                height={1024}
                priority
                className="relative hidden h-auto w-full drop-shadow-[0_0_40px_rgba(91,115,232,0.45)] dark:block"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicateur de scroll */}
      <div aria-hidden className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <div className="flex h-9 w-6 justify-center rounded-full border border-foreground/30 pt-1.5">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="h-1.5 w-1 rounded-full bg-foreground"
          />
        </div>
      </div>
    </section>
  );
}
