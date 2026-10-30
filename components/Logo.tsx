import Image from "next/image";

// Deux variantes du logo : bleu sur fond clair, bleu clair sur fond sombre.
export default function Logo({ size = 44, priority = false }: { size?: number; priority?: boolean }) {
  const common = { alt: "ESEN Ambassadors", width: size, height: size, priority };
  const style = { height: size, width: "auto" };
  return (
    <>
      <Image src="/images/logo.webp" {...common} className="block dark:hidden" style={style} />
      <Image src="/images/logo-light.webp" {...common} className="hidden dark:block" style={style} />
    </>
  );
}
