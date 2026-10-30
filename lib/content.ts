// Contenu éditable de la page d'accueil.
// TODO(organisation) : les valeurs `null` sont à fournir, rien n'est inventé. Elles s'affichent « — » en attendant.
export const stats: { label: string; value: number | null; suffix?: string }[] = [
  { label: "Membres", value: null },
  { label: "Événements organisés", value: null },
  { label: "Années d'existence", value: null },
];

// TODO(organisation) : textes provisoires, à remplacer par la formulation officielle.
export const hero = {
  eyebrow: "Organisation étudiante · ESEN Manouba",
  title: "Les ambassadeurs de l'École Supérieure de l'Économie Numérique",
  subtitle:
    "ESEN Ambassadors rassemble les étudiants de l'ESEN autour de projets, d'événements et de partenariats.",
};

// TODO(organisation) : mission et vision provisoires (formulations génériques), à remplacer par les textes officiels.
// `history` est vide tant que les étapes ne sont pas fournies : { year, title, text }.
export const about: {
  mission: string;
  vision: string;
  history: { year: string; title: string; text: string }[];
} = {
  mission:
    "Représenter l'ESEN et fédérer ses étudiants autour de projets, d'événements et de partenariats qui valorisent l'école.",
  vision:
    "Devenir une organisation étudiante de référence, structurée et reconnue, au service de la communauté de l'économie numérique.",
  history: [],
};

// TODO(organisation) : piliers provisoires, à confirmer ou remplacer.
export const pillars = [
  {
    title: "Événements",
    text: "Organiser des rencontres, conférences et activités qui font vivre l'école.",
  },
  {
    title: "Partenariats",
    text: "Créer des liens avec des entreprises et des institutions.",
  },
  {
    title: "Communauté",
    text: "Fédérer les étudiants autour de valeurs et de projets communs.",
  },
];
