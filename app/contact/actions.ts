"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { contactSchema, type ContactState } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/rate-limit";

// Protection CSRF : Next.js compare automatiquement l'en-tête Origin au Host pour les Server Actions
// et refuse les requêtes cross-origin. Les secrets ne sont lus que depuis process.env (.env.local).
const MIN_FILL_MS = 3000; // un humain met plus de 3 s à remplir le formulaire

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const h = headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "unknown";

  if (!rateLimit(`contact:${ip}`)) {
    return { ok: false, message: "Trop de tentatives. Réessaie dans quelques minutes." };
  }

  // Piège temporel : horodatage posé au rendu du formulaire.
  const renderedAt = Number(formData.get("t"));
  const tooFast = !Number.isFinite(renderedAt) || Date.now() - renderedAt < MIN_FILL_MS;

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    topic: formData.get("topic"),
    message: formData.get("message"),
    website: formData.get("website") ?? "",
  });

  // Honeypot rempli ou envoi trop rapide : on feint le succès pour ne rien apprendre aux robots.
  if (tooFast || (!parsed.success && parsed.error.issues.some((i) => i.path[0] === "website"))) {
    return { ok: true, message: "Merci ! Ton message a bien été envoyé." };
  }
  if (!parsed.success) {
    return {
      ok: false,
      message: "Certains champs sont invalides.",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const { name, email, topic, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV === "production") {
      console.error("Contact : RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL manquants.");
      return { ok: false, message: "Le service d'envoi n'est pas configuré. Réessaie plus tard." };
    }
    // En développement : on journalise au lieu d'envoyer.
    console.log("[contact:dev] non envoyé (variables .env.local absentes)", { name, email, topic, message });
    return { ok: true, message: "Mode développement : message journalisé dans le terminal, non envoyé." };
  }

  try {
    const resend = new Resend(apiKey);
    // Corps en texte brut (pas de HTML) : aucune injection possible depuis les champs saisis.
    // Les retours à la ligne sont retirés des champs utilisés dans les en-têtes (sujet, reply-to).
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Site] ${topic} — ${name}`.replace(/[\r\n]+/g, " ").slice(0, 150),
      text: `Nom : ${name}\nEmail : ${email}\nSujet : ${topic}\n\n${message}`,
    });
    if (error) throw new Error(error.message);
    return { ok: true, message: "Merci ! Ton message a bien été envoyé." };
  } catch (err) {
    console.error("Contact : échec d'envoi", err);
    return { ok: false, message: "L'envoi a échoué. Réessaie dans un instant." };
  }
}
