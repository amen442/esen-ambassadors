"use client";

import { motion, useScroll, useTransform } from "framer-motion";

// Bandeau de titre commun aux pages intérieures. Chaque page y injecte son propre visuel animé (`visual`).
export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  visual,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  visual?: React.ReactNode;
}) {
  // Parallaxe : le visuel défile plus lentement que le texte.
  const { scrollY } = useScroll();
  const vy = useTransform(scrollY, [0, 500], [0, 90]);
  const vo = useTransform(scrollY, [0, 400], [1, 0.2]);

  const words = title.split(" ");

  return (
    <section className="relative -mt-16 overflow-hidden bg-[#F1F4FC] pt-16 dark:bg-[#070B1A]">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(39,57,145,0.14),transparent_55%),radial-gradient(ellipse_at_100%_100%,rgba(184,131,47,0.14),transparent_45%)] dark:bg-[radial-gradient(ellipse_at_20%_0%,rgba(39,57,145,0.5),transparent_55%),radial-gradient(ellipse_at_100%_100%,rgba(212,162,76,0.1),transparent_45%)]"
      />
      {visual && (
        // Le centrage (Tailwind) est sur le conteneur externe : un `y` Framer sur le même élément l'écraserait.
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-12%] top-1/2 h-[22rem] w-[22rem] -translate-y-1/2 opacity-60 sm:right-0 sm:h-[22rem] sm:w-[22rem] md:right-[4%] md:h-[25rem] md:w-[25rem] md:opacity-100"
        >
          <motion.div style={{ y: vy, opacity: vo }} className="h-full w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="h-full w-full"
            >
              {visual}
            </motion.div>
          </motion.div>
        </div>
      )}
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-accent"
        >
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h-px w-10 origin-left bg-accent"
          />
          {eyebrow}
        </motion.p>
        <h1 className="mt-3 max-w-3xl text-balance font-serif text-4xl font-bold sm:text-5xl">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: "0.5em", filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.12 + i * 0.06, ease: "easeOut" }}
              className="mr-[0.25em] inline-block"
            >
              {w}
            </motion.span>
          ))}
        </h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + words.length * 0.05 }}
            className="mt-4 max-w-2xl text-lg text-muted"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
