"use client";

import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";
import type { EventMeta } from "@/lib/mdx";
import { formatDate } from "@/lib/format";

// Événements : le bloc date se retourne à l'apparition, un point et un trait de frise se dessinent.
export default function EventCard({
  meta,
  past = false,
  last = false,
}: {
  meta: EventMeta;
  past?: boolean;
  last?: boolean;
}) {
  return (
    <div className="relative pl-9">
      {/* Frise verticale : le trait se déroule vers le bas au scroll */}
      {!last && (
        <motion.span
          aria-hidden
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute left-[7px] top-7 -bottom-6 w-px origin-top bg-border"
        />
      )}
      <motion.span
        aria-hidden
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className={`absolute left-0 top-6 h-4 w-4 rounded-full border-2 border-background ${past ? "bg-muted" : "bg-accent"} ring-2 ring-border`}
      />
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <SpotlightCard className={past ? "opacity-80" : ""} innerClassName="flex gap-5">
          <motion.div
            initial={{ rotateX: -90, opacity: 0 }}
            whileInView={{ rotateX: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            style={{ transformPerspective: 500 }}
            className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-primary text-primary-fg"
          >
            <span className="font-serif text-2xl font-bold leading-none">{formatDate(meta.date, { day: "numeric" })}</span>
            <span className="text-xs uppercase">{formatDate(meta.date, { month: "short" })}</span>
          </motion.div>
          <div>
            <h3 className="font-serif text-xl font-semibold">{meta.title}</h3>
            <p className="mt-1 text-sm text-accent">
              {formatDate(meta.date)} · {meta.location}
            </p>
            <p className="mt-2 text-muted">{meta.description}</p>
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
}
