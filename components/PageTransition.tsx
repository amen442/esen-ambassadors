"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { nav, siteName } from "@/lib/site";

// Transition entre pages : chaque destination a sa propre animation de rideau.
// Un rideau recouvre l'écran, la navigation a lieu derrière (il sert d'écran de chargement), puis il se retire.
// Les clics sur les liens internes sont interceptés globalement (phase de capture) : menu, boutons,
// pied de page et liens des articles MDX sont couverts sans modifier chaque lien.
type Phase = "idle" | "cover" | "reveal";
type Variant = "iris" | "ripples" | "mosaic" | "strips" | "grid" | "slash";
type Origin = { x: number; y: number }; // position du clic, en % de la fenêtre

const SETTLE_MS = 300; // laisse la nouvelle page se monter avant d'ouvrir
const REVEAL_MS = 1100; // durée max de l'ouverture avant de démonter le rideau
const FAILSAFE_MS = 8000; // si la navigation n'aboutit pas, on rouvre quand même
const EASE = [0.76, 0, 0.24, 1] as const;

// Animation choisie selon la page de destination, avec la durée de fermeture associée.
function variantFor(path: string): { variant: Variant; coverMs: number } {
  if (path.startsWith("/a-propos")) return { variant: "ripples", coverMs: 950 };
  if (path.startsWith("/equipe")) return { variant: "mosaic", coverMs: 850 };
  if (path.startsWith("/actualites")) return { variant: "strips", coverMs: 950 };
  if (path.startsWith("/evenements")) return { variant: "grid", coverMs: 950 };
  if (path.startsWith("/contact")) return { variant: "slash", coverMs: 850 };
  return { variant: "iris", coverMs: 850 };
}

function labelFor(path: string) {
  const hit = nav.find((n) => (n.href === "/" ? path === "/" : path.startsWith(n.href)));
  return hit ? hit.label : siteName;
}

type CurtainProps = { covering: boolean; origin: Origin };

/* ---------- Accueil : iris qui s'ouvre depuis le point cliqué, avec liseré doré ---------- */
function Iris({ covering, origin }: CurtainProps) {
  const at = `${origin.x}% ${origin.y}%`;
  const circle = (r: number) => `circle(${r}% at ${at})`;
  return (
    <>
      {[
        { bg: "#E6B866", delay: 0 },
        { bg: "#141C5C", delay: 0.07 },
      ].map((l, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{ background: l.bg }}
          initial={{ clipPath: circle(0) }}
          animate={{ clipPath: circle(covering ? 150 : 0) }}
          transition={{ duration: 0.75, ease: EASE, delay: covering ? l.delay : (1 - i) * 0.07 }}
        />
      ))}
    </>
  );
}

/* ---------- À propos : ondes concentriques qui rayonnent depuis le centre ---------- */
function Ripples({ covering }: CurtainProps) {
  const colors = ["#4A5FD0", "#273991", "#141C5C", "#0A0E1F"];
  return (
    <>
      {colors.map((bg, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{ background: bg }}
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: `circle(${covering ? 150 : 0}% at 50% 50%)` }}
          transition={{ duration: 0.7, ease: EASE, delay: covering ? i * 0.12 : (colors.length - 1 - i) * 0.1 }}
        />
      ))}
    </>
  );
}

/* ---------- Équipe : mosaïque 3×3 (les 9 rôles) de tuiles qui se gonflent en diagonale ---------- */
function Mosaic({ covering }: CurtainProps) {
  const colors = ["#0A0E1F", "#141C5C", "#273991"];
  return (
    <>
      {Array.from({ length: 9 }, (_, n) => {
        const r = Math.floor(n / 3);
        const c = n % 3;
        const wave = r + c; // 0..4 : diagonale
        return (
          <motion.div
            key={n}
            className="absolute"
            style={{ left: `${c * 33.333}%`, top: `${r * 33.333}%`, width: "33.5%", height: "33.5%", background: colors[(r + c) % 3] }}
            initial={{ scale: 0, borderRadius: "50%", rotate: -25 }}
            animate={covering ? { scale: 1.02, borderRadius: "0%", rotate: 0 } : { scale: 0, borderRadius: "50%", rotate: 25 }}
            transition={{ duration: 0.5, ease: EASE, delay: covering ? wave * 0.08 : (4 - wave) * 0.07 }}
          />
        );
      })}
    </>
  );
}

/* ---------- Actualités : bandes de journal qui défilent en sens alternés, sortent de l'autre côté ---------- */
function Strips({ covering }: CurtainProps) {
  const rows = 7;
  const colors = ["#0A0E1F", "#141C5C", "#273991"];
  return (
    <>
      {Array.from({ length: rows }, (_, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        return (
          <motion.div
            key={i}
            className="absolute inset-x-0"
            style={{ top: `${(i * 100) / rows}%`, height: `${100 / rows + 0.4}%`, background: colors[i % 3] }}
            initial={{ x: `${-dir * 101}%` }}
            animate={{ x: covering ? "0%" : `${dir * 101}%` }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.065 }}
          />
        );
      })}
    </>
  );
}

/* ---------- Événements : grille de calendrier dont les cases s'allument en vague ---------- */
function Grid({ covering }: CurtainProps) {
  const cols = 8;
  const rows = 5;
  return (
    <>
      {Array.from({ length: cols * rows }, (_, n) => {
        const r = Math.floor(n / cols);
        const c = n % cols;
        const wave = c + r; // 0..11
        const gold = (c * 7 + r * 3) % 11 === 0; // quelques « dates » dorées
        return (
          <motion.div
            key={n}
            className="absolute"
            style={{
              left: `${(c * 100) / cols}%`,
              top: `${(r * 100) / rows}%`,
              width: `${100 / cols + 0.3}%`,
              height: `${100 / rows + 0.4}%`,
              background: gold ? "#E6B866" : (c + r) % 2 ? "#141C5C" : "#0A0E1F",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={covering ? { scale: 1.03, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: covering ? wave * 0.05 : (11 - wave) * 0.04 }}
          />
        );
      })}
    </>
  );
}

/* ---------- Contact : balayage en diagonale (doré, bleu, nuit) qui traverse l'écran ---------- */
function Slash({ covering }: CurtainProps) {
  const layers = [
    { bg: "#E6B866", delay: 0 },
    { bg: "#273991", delay: 0.07 },
    { bg: "#0A0E1F", delay: 0.14 },
  ];
  return (
    <>
      {layers.map((l, i) => (
        <motion.div
          key={i}
          className="absolute inset-y-0 -left-[25%] w-[150%]"
          style={{ background: l.bg, skewX: -14 }}
          initial={{ x: "110%" }}
          animate={{ x: covering ? "0%" : "-110%" }}
          transition={{ duration: 0.65, ease: EASE, delay: l.delay }}
        />
      ))}
    </>
  );
}

const curtains: Record<Variant, (p: CurtainProps) => JSX.Element> = {
  iris: Iris,
  ripples: Ripples,
  mosaic: Mosaic,
  strips: Strips,
  grid: Grid,
  slash: Slash,
};

/* ---------- Titre cinétique : les lettres montent une à une ---------- */
function KineticTitle({ label, covering }: { label: string; covering: boolean }) {
  const letters = Array.from(label);
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
        animate={covering ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.7, rotate: 20 }}
        transition={{ duration: 0.5, delay: covering ? 0.25 : 0, ease: "easeOut" }}
      >
        <Image src="/images/logo-light.webp" alt="" width={88} height={88} className="h-20 w-auto sm:h-24" priority />
      </motion.div>
      <h2 className="flex flex-wrap justify-center px-4 font-serif text-5xl font-bold sm:text-7xl" aria-hidden>
        {letters.map((ch, i) => (
          <span key={i} className="inline-block overflow-hidden pb-2">
            <motion.span
              className="inline-block"
              initial={{ y: "115%" }}
              animate={{ y: covering ? "0%" : "-115%" }}
              transition={{ duration: 0.5, ease: EASE, delay: covering ? 0.3 + i * 0.04 : i * 0.02 }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          </span>
        ))}
      </h2>
      <span className="relative block h-0.5 w-44 overflow-hidden rounded-full bg-white/20">
        <motion.span
          className="absolute inset-y-0 w-1/2 rounded-full bg-[#E6B866]"
          animate={covering ? { x: ["-100%", "200%"] } : { x: "-100%" }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </div>
  );
}

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [run, setRun] = useState({ id: 0, variant: "iris" as Variant, label: "", origin: { x: 50, y: 50 } });
  const busy = useRef(false);
  const target = useRef<string | null>(null);
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const reveal = () => {
    clearTimers();
    setPhase("reveal");
    later(() => {
      setPhase("idle"); // démonte le rideau
      busy.current = false;
      target.current = null;
    }, REVEAL_MS);
  };

  // Interception des clics sur les liens internes.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // même page / ancre
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // navigation normale

      e.preventDefault(); // Next.js ignore le clic quand il est déjà « defaultPrevented »
      if (busy.current) return;
      busy.current = true;
      target.current = url.pathname;

      const { variant, coverMs } = variantFor(url.pathname);
      // Clic clavier (detail 0) : pas de coordonnées utiles, on part du centre.
      const origin: Origin =
        e.detail === 0
          ? { x: 50, y: 50 }
          : { x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 };
      setRun((r) => ({ id: r.id + 1, variant, label: labelFor(url.pathname), origin }));
      setPhase("cover");
      later(() => router.push(url.pathname + url.search + url.hash), coverMs);
      later(reveal, FAILSAFE_MS);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // La nouvelle page est montée : on retire le rideau.
  useEffect(() => {
    if (busy.current && target.current && pathname === target.current) {
      clearTimers();
      later(reveal, SETTLE_MS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (phase === "idle") return null;

  const covering = phase === "cover";
  const Curtain = curtains[run.variant];

  // `key` : le rideau est remonté à chaque navigation, donc il repart toujours de son état initial.
  return (
    <div aria-hidden key={run.id} className="fixed inset-0 z-[100] overflow-hidden">
      <Curtain covering={covering} origin={run.origin} />
      <KineticTitle label={run.label} covering={covering} />
    </div>
  );
}
