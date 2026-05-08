import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL("https://personal-portfolio-flax-gamma.vercel.app"),
  title: "Gabriel Nascimento — Frontend Developer",
  description:
    "Portfólio de Gabriel Nascimento, desenvolvedor frontend especializado em interfaces modernas e animações.",
  keywords: ["frontend", "react", "nextjs", "typescript", "portfolio"],
  authors: [{ name: "Gabriel Nascimento" }],
  openGraph: {
    title: "Gabriel Nascimento — Frontend Developer",
    description: "Portfólio interativo com animações modernas.",
    url: "https://personal-portfolio-flax-gamma.vercel.app",
    siteName: "Gabriel Nascimento Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Nascimento — Frontend Developer",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
