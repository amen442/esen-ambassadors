import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: {
    default: "ESEN Ambassadors",
    template: "%s | ESEN Ambassadors",
  },
  description:
    "ESEN Ambassadors, l'organisation étudiante de l'École Supérieure de l'Économie Numérique de la Manouba.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${serif.variable} font-sans antialiased`}>
        <Providers>
          <PageTransition />
          <ScrollProgress />
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
