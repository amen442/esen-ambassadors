// Un template est remonté à chaque navigation : fondu doux entre les pages.
// Animation CSS (et non Framer Motion) pour que la page reste visible avant l'hydratation JS.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-in">{children}</div>;
}
