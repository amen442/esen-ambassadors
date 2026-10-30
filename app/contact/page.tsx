import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import MessagesVisual from "@/components/visuals/MessagesVisual";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Nous rejoindre",
  description: "Contacte ESEN Ambassadors ou rejoins l'organisation.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Nous rejoindre"
        subtitle="Une question, une idée de partenariat ou l'envie de rejoindre l'équipe ? Écris-nous."
        visual={<MessagesVisual />}
      />
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <ContactForm />
      </section>
    </>
  );
}
