import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FlowVisual from "@/components/visuals/FlowVisual";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import DashedBox from "@/components/DashedBox";
import { getEntries, type PostMeta } from "@/lib/mdx";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Les dernières nouvelles d'ESEN Ambassadors.",
};

export default function BlogPage() {
  const posts = getEntries<PostMeta>("blog");

  return (
    <>
      <PageHeader
        eyebrow="Actualités"
        title="Les dernières nouvelles"
        subtitle="Annonces, retours d'événements et vie de l'organisation."
        visual={<FlowVisual />}
      />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {posts.length === 0 ? (
          <DashedBox>Aucun article pour le moment.</DashedBox>
        ) : (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <li key={p.slug}>
                {/* Rideau : chaque carte se dévoile de haut en bas, en cascade */}
                <Reveal delay={(i % 3) * 0.12} from="wipe" className="h-full">
                  <Link href={`/actualites/${p.slug}`} className="group block h-full">
                    <SpotlightCard className="h-full">
                      <time dateTime={p.meta.date} className="text-sm text-accent">
                        {formatDate(p.meta.date)}
                      </time>
                      <h2 className="mt-2 font-serif text-xl font-semibold">{p.meta.title}</h2>
                      <p className="mt-2 text-muted">{p.meta.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                        Lire la suite
                        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                      </span>
                    </SpotlightCard>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
