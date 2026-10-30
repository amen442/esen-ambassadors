import Link from "next/link";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import Magnetic from "@/components/Magnetic";
import { pillars } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Stats />

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-accent">Ce que nous faisons</p>
          <h2 className="mt-2 max-w-2xl text-balance font-serif text-3xl font-bold sm:text-4xl">
            Une organisation au service de la communauté de l&apos;ESEN
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className={i === 0 ? "md:col-span-2" : ""}>
              <SpotlightCard className="h-full">
                <span className="font-serif text-sm text-accent">0{i + 1}</span>
                <h3 className="mt-3 font-serif text-2xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-muted">{p.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#070B1A] text-white">
        <div
          aria-hidden
          className="absolute inset-0 animate-gradient bg-[linear-gradient(120deg,rgba(39,57,145,0.7),rgba(10,14,31,0.9),rgba(212,162,76,0.25))] bg-[length:200%_200%]"
        />
        <Reveal className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-balance font-serif text-3xl font-bold sm:text-5xl">Rejoignez les Ambassadors</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Envie de contribuer à la vie de l&apos;école ? Écrivez-nous.
          </p>
          <div className="mt-8">
            <Magnetic>
              <Link
                href="/contact"
                className="inline-block rounded-full bg-white px-8 py-4 font-medium text-[#0A0E1F] shadow-lg shadow-primary/30 transition hover:shadow-primary/60"
              >
                Nous rejoindre →
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </>
  );
}
