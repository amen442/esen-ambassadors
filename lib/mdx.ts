import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Lecture du contenu en fichiers MDX (content/blog, content/events). Pas de base de données.
const root = path.join(process.cwd(), "content");

export type Collection = "blog" | "events";

export type Entry<T> = { slug: string; meta: T; body: string };

export type PostMeta = { title: string; date: string; excerpt: string };
export type EventMeta = { title: string; date: string; location: string; description: string };

// Le slug vient de l'URL : on n'accepte que [a-z0-9-] pour empêcher toute traversée de répertoire.
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function read<T>(collection: Collection, slug: string): Entry<T> | null {
  if (!SLUG.test(slug)) return null;
  const file = path.join(root, collection, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  // gray-matter parse les dates YAML en objets Date : on normalise en chaîne ISO (AAAA-MM-JJ).
  const meta = { ...data, date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? "") };
  return { slug, meta: meta as T, body: content };
}

export function getEntries<T extends { date: string }>(collection: Collection): Entry<T>[] {
  const dir = path.join(root, collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => read<T>(collection, f.replace(/\.mdx$/, "")))
    .filter((e): e is Entry<T> => e !== null)
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export const getEntry = read;
