"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";

// `reducedMotion="user"` : Framer Motion désactive les animations de déplacement si le système le demande.
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
