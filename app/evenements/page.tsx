import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GridVisual from "@/components/visuals/GridVisual";
import EventCard from "@/components/EventCard";
import DashedBox from "@/components/DashedBox";
import { getEntries, type EventMeta } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Événements",
  description: "Événements passés et à venir d'ESEN Ambassadors.",
};

// La page est statique mais re-générée chaque heure pour que « à venir / passés » reste juste.
export const revalidate = 3600;

export default function EventsPage() {
  const all = getEntries<EventMeta>("events");
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = all.filter((e) => e.meta.date >= today).reverse(); // du plus proche au plus lointain
  const past = all.filter((e) => e.meta.date < today);

  return (
    <>
      <PageHeader
        eyebrow="Événements"
        title="Rencontrons-nous"
        subtitle="Les événements organisés par ESEN Ambassadors."
        visual={<GridVisual />}
      />
      <div className="mx-auto max-w-4xl space-y-14 px-4 py-16 sm:px-6">
        <section aria-labelledby="upcoming">
          <h2 id="upcoming" className="font-serif text-2xl font-bold">À venir</h2>
          {upcoming.length === 0 ? (
            <div className="mt-4"><DashedBox>Aucun événement programmé pour le moment.</DashedBox></div>
          ) : (
            <ul className="mt-5 space-y-6">
              {upcoming.map((e, i) => (
                <li key={e.slug}><EventCard meta={e.meta} last={i === upcoming.length - 1} /></li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="past">
          <h2 id="past" className="font-serif text-2xl font-bold">Passés</h2>
          {past.length === 0 ? (
            <div className="mt-4"><DashedBox>Aucun événement passé à afficher.</DashedBox></div>
          ) : (
            <ul className="mt-5 space-y-6">
              {past.map((e, i) => (
                <li key={e.slug}><EventCard meta={e.meta} past last={i === past.length - 1} /></li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
