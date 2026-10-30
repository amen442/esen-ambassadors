// Les 9 rôles de la structure « ESEN Ambassadors 2.0 ».
// TODO(organisation) : intitulés, descriptions, noms et photos NON FOURNIS. Les emplacements ci-dessous
// sont vides à dessein : renseigne `role`, `description`, et optionnellement `name` et `photo`
// (chemin dans /public/images/team/, ex. "/images/team/prenom-nom.webp").
export type TeamMember = {
  role: string | null;
  description: string | null;
  name?: string;
  photo?: string;
};

export const team: TeamMember[] = Array.from({ length: 9 }, () => ({ role: null, description: null }));
