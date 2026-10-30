import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getEntries, getEntry, type PostMeta } from "@/lib/mdx";
import { formatDate } from "@/lib/format";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getEntries<PostMeta>("blog").map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getEntry<PostMeta>("blog", params.slug);
  return post ? { title: post.meta.title, description: post.meta.excerpt } : {};
}

export default function PostPage({ params }: Props) {
  const post = getEntry<PostMeta>("blog", params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <Link href="/actualites" className="text-sm text-muted hover:text-primary">
        ← Toutes les actualités
      </Link>
      <time dateTime={post.meta.date} className="mt-6 block text-sm text-accent">
        {formatDate(post.meta.date)}
      </time>
      <h1 className="mt-2 text-balance font-serif text-4xl font-bold sm:text-5xl">{post.meta.title}</h1>
      <div className="prose prose-lg mt-8 max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary prose-strong:text-foreground prose-blockquote:border-accent prose-blockquote:text-muted prose-li:text-foreground/90 prose-li:marker:text-accent prose-code:text-primary prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-border prose-pre:bg-surface prose-pre:text-foreground [&_pre_code]:text-foreground dark:prose-invert">
        <MDXRemote source={post.body} />
      </div>
    </article>
  );
}
