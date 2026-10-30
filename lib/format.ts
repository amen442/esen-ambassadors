// Formate une date AAAA-MM-JJ en français (ex. « 12 mars 2026 »), fuseau fixe pour éviter les décalages d'un jour.
export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) {
  const d = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("fr-FR", { ...opts, timeZone: "UTC" }).format(d);
}
