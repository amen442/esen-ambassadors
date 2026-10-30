import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="font-serif text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 font-serif text-2xl font-semibold">Page introuvable</h1>
      <p className="mt-2 text-muted">La page demandée n&apos;existe pas ou a été déplacée.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-medium text-primary-fg">
        Retour à l&apos;accueil
      </Link>
    </section>
  );
}
