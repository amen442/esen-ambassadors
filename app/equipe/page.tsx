import Image from "next/image";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import OrbitVisual from "@/components/visuals/OrbitVisual";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import TiltCard from "@/components/TiltCard";
import AvatarRing from "@/components/AvatarRing";
import { team, type TeamMember } from "@/content/team";

export const metadata: Metadata = {
  title: "Équipe",
  description: "Les 9 rôles de la structure ESEN Ambassadors 2.0.",
};

// Avatar : photo si fournie, sinon initiales du nom, sinon numéro du rôle.
function Avatar({ member, index }: { member: TeamMember; index: number }) {
  if (member.photo) {
    return (
      <Image
        src={member.photo}
        alt={member.name ? `Photo de ${member.name}` : `Photo du rôle ${member.role ?? index + 1}`}
        width={96}
        height={96}
        className="h-24 w-24 rounded-full object-cover"
      />
    );
  }
  const initials = member.name
    ?.split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      aria-hidden
      className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#5B73E8] font-serif text-3xl font-bold text-primary-fg"
    >
      {initials ?? index + 1}
    </div>
  );
}

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Équipe"
        title="Les neuf rôles d'ESEN Ambassadors 2.0"
        subtitle="Une organisation structurée où chaque rôle porte une responsabilité claire."
        visual={<OrbitVisual />}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <li key={i}>
              <Reveal delay={(i % 3) * 0.1} from="scale" className="h-full">
                <TiltCard className="h-full">
                  <SpotlightCard className="h-full" innerClassName="flex flex-col items-center text-center">
                    <AvatarRing>
                      <Avatar member={member} index={i} />
                    </AvatarRing>
                    <h2 className="mt-5 font-serif text-xl font-semibold">
                      {member.role ?? <span className="text-muted">Rôle {i + 1} · à définir</span>}
                    </h2>
                    {member.name && <p className="mt-1 text-sm font-medium text-primary">{member.name}</p>}
                    <p className="mt-2 text-sm text-muted">
                      {member.description ?? "Description à fournir par l'organisation."}
                    </p>
                  </SpotlightCard>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
