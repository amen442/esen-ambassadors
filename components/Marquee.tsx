// Bandeau défilant en boucle (contenu dupliqué, translation de -50 %).
const words = ["Économie numérique", "Innovation", "Leadership", "Communauté", "Partenariats", "Événements"];

export default function Marquee() {
  const row = [...words, ...words];
  return (
    <div aria-hidden className="overflow-hidden border-y border-border bg-surface py-4">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-serif text-xl text-muted">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            {w}
            <span className="text-accent">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
