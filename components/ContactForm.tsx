"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { sendContact } from "@/app/contact/actions";
import { contactSchema, TOPICS, type ContactState } from "@/lib/contact-schema";

const initial: ContactState = { ok: false, message: "" };

// Chaque champ entre en cascade (délai selon sa position).
function Field({ i, children }: { i: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <motion.button
      type="submit"
      disabled={pending}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-medium text-primary-fg shadow-lg shadow-primary/25 disabled:opacity-60"
    >
      {pending ? (
        <>
          <motion.span
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="h-4 w-4 rounded-full border-2 border-primary-fg/40 border-t-primary-fg"
          />
          Envoi…
        </>
      ) : (
        <>
          Envoyer <span aria-hidden>→</span>
        </>
      )}
    </motion.button>
  );
}

function ErrorText ({ id, text }: { id: string; text?: string }) {
return (
  <AnimatePresence>
    {text && (
      <motion.p
        id={id}
        initial={{ opacity: 0, height: 0, x: -6 }}
        animate={{ opacity: 1, height: "auto", x: 0 }}
        exit={{ opacity: 0, height: 0 }}
        className="mt-1 text-sm text-red-600 dark:text-red-400"
      >
        {text}
      </motion.p>
    )}
  </AnimatePresence>
);
}

// Coche qui se dessine à la réussite.
function Check() {
  return (
    <motion.svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <motion.circle cx={12} cy={12} r={10} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
      <motion.path d="M7 12.5l3.2 3.2L17 9" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.45 }} />
    </motion.svg>
  );
}

const field =
  "mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none transition focus:border-primary focus:shadow-[0_0_0_4px_rgb(var(--primary)/0.15)] aria-[invalid=true]:border-red-500";

export default function ContactForm() {
  const [state, action] = useFormState(sendContact, initial);
  const [clientErrors, setClientErrors] = useState<ContactState["errors"]>();
  const formRef = useRef<HTMLFormElement>(null);
  // Horodatage posé côté client au montage (piège anti-robot vérifié par le serveur).
  const [renderedAt, setRenderedAt] = useState("");
  useEffect(() => setRenderedAt(String(Date.now())), []);
  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  // Validation client avec le même schéma que le serveur ; le serveur revalide toujours.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const fd = new FormData(e.currentTarget);
    const r = contactSchema.safeParse(Object.fromEntries(fd));
    if (!r.success) {
      e.preventDefault();
      setClientErrors(z.flattenError(r.error).fieldErrors);
    } else {
      setClientErrors(undefined);
    }
  };

  const errors = clientErrors ?? state.errors;
  const err = (k: "name" | "email" | "topic" | "message") => errors?.[k]?.[0];

  return (
    <form ref={formRef} action={action} onSubmit={onSubmit} noValidate className="space-y-5">
      <Field i={0}>
        <label htmlFor="name" className="text-sm font-medium">Nom</label>
        <input id="name" name="name" autoComplete="name" required maxLength={80} aria-invalid={!!err("name")} aria-describedby="name-err" className={field} />
        <ErrorText id="name-err" text={err("name")} />
      </Field>
      <Field i={1}>
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required maxLength={120} aria-invalid={!!err("email")} aria-describedby="email-err" className={field} />
        <ErrorText id="email-err" text={err("email")} />
      </Field>
      <Field i={2}>
        <label htmlFor="topic" className="text-sm font-medium">Sujet</label>
        <select id="topic" name="topic" required defaultValue="" aria-invalid={!!err("topic")} aria-describedby="topic-err" className={field}>
          <option value="" disabled>Choisir…</option>
          {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <ErrorText id="topic-err" text={err("topic")} />
      </Field>
      <Field i={3}>
        <label htmlFor="message" className="text-sm font-medium">Message</label>
        <textarea id="message" name="message" rows={6} required maxLength={2000} aria-invalid={!!err("message")} aria-describedby="message-err" className={field} />
        <ErrorText id="message-err" text={err("message")} />
      </Field>

      {/* Honeypot : masqué aux humains et aux lecteurs d'écran, les robots le remplissent. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="t" value={renderedAt} />

      <Field i={4}>
        <div className="flex flex-wrap items-center gap-4">
          <Submit />
          <div role="status" aria-live="polite" className="min-h-6">
            <AnimatePresence mode="wait">
              {state.message && (
                <motion.p
                  key={state.message}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex items-center gap-2 text-sm ${state.ok ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                >
                  {state.ok && <Check />}
                  {state.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Field>
    </form>
  );
}
