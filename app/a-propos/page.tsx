import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import RipplesVisual from "@/components/visuals/RipplesVisual";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import DashedBox from "@/components/DashedBox";
import DrawLine from "@/components/DrawLine";
import { about } from "@/lib/content";

export const metadata: Metadata = {
  title: "À propos",
  description: "Mission, vision et histoire d'ESEN Ambassadors.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="À propos"
        title="Une organisation étudiante au cœur de l'ESEN"
        subtitle="École Supérieure de l'Économie Numérique, Université de la Manouba, Tunisie."
        visual={<RipplesVisual />}
      />

      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-16 sm:px-6 md:grid-cols-2">
        {[
          { label: "Mission", text: about.mission, from: "left" as const },
          { label: "Vision", text: about.vision, from: "right" as const },
        ].map((b, i) => (
          <Reveal key={b.label} delay={i * 0.1} from={b.from}>
            <SpotlightCard className="h-full">
              <p className="text-sm font-medium uppercase tracking-widest text-accent">{b.label}</p>
              <DrawLine className="my-3 h-0.5 w-16 bg-accent" />
              <p className="text-lg">{b.text}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <Reveal>
          <h2 className="font-serif text-3xl font-bold">Notre histoire</h2>
          <DrawLine className="mt-3 h-0.5 w-24 bg-accent" />
        </Reveal>
        {about.history.length === 0 ? (
          <Reveal delay={0.1}>
            {/* TODO(organisation) : fournir les grandes étapes (année, titre, texte) dans lib/content.ts */}
            <div className="mt-6">
              <DashedBox>
                L&apos;histoire d&apos;ESEN Ambassadors sera racontée ici : création, grandes étapes, passage à la structure 2.0.
              </DashedBox>
            </div>
          </Reveal>
        ) : (
          <ol className="relative mt-8 border-l border-border pl-6">
            {about.history.map((h) => (
              <Reveal key={h.year + h.title} from="left">
                <li className="mb-8">
                  <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-accent" aria-hidden />
                  <p className="font-serif text-sm text-accent">{h.year}</p>
                  <h3 className="font-serif text-xl font-semibold">{h.title}</h3>
                  <p className="mt-1 text-muted">{h.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        )}
        <Reveal delay={0.1}>
          <Link href="/contact" className="mt-8 inline-block font-medium text-primary hover:underline">
            Rejoindre l&apos;aventure →
          </Link>
        </Reveal>
      </section>
    </>
  );
}
