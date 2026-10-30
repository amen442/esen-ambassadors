import { z } from "zod";

// Schéma partagé : validation côté client (retour immédiat) ET côté serveur (seule source de vérité).
export const TOPICS = ["Rejoindre l'organisation", "Partenariat", "Autre"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Indique ton nom (2 caractères minimum).").max(80, "Nom trop long (80 max)."),
  email: z.string().trim().max(120, "Email trop long.").pipe(z.email("Adresse email invalide.")),
  topic: z.enum(TOPICS, { error: "Choisis un sujet." }),
  message: z
    .string()
    .trim()
    .min(10, "Message trop court (10 caractères minimum).")
    .max(2000, "Message trop long (2000 max)."),
  // Honeypot : invisible pour les humains, rempli par les robots. Doit rester vide.
  website: z.string().max(0).optional(),
});

export type ContactFields = z.infer<typeof contactSchema>;

export type ContactState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<"name" | "email" | "topic" | "message", string[]>>;
};
