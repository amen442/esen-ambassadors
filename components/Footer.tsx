import Link from "next/link";
import { nav, siteName } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-serif text-lg font-semibold">{siteName}</p>
          <p className="mt-1 max-w-xs text-sm text-muted">
            École Supérieure de l&apos;Économie Numérique, Université de la Manouba.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-muted transition hover:text-primary">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {siteName}. Tous droits réservés.
      </div>
    </footer>
  );
}
