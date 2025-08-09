import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../../../../packages/ui/src/styles/globals.css";
import { ConvexProvider } from "./providers/convex-provider";
import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "AidaEon - Marketing Digital, Automação e IA",
    template: "%s | AidaEon",
  },
  description: "Plataforma de serviços digitais especializada em Marketing Digital, Automação e Inteligência Artificial. Soluções inovadoras com tecnologias de ponta para otimizar suas operações de comunicação, vendas e atendimento.",
  keywords: [
    "marketing digital",
    "automação",
    "inteligência artificial",
    "IA",
    "WhatsApp",
    "tráfego pago",
    "redes sociais",
    "agentes conversacionais",
    "LGPD",
    "contratos digitais",
    "Next.js",
    "Convex",
    "Evolution API",
    "VibeCode",
  ],
  authors: [{ name: "AidaEon Team" }],
  creator: "AidaEon",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://aidaeon.com",
    title: "AidaEon - Marketing Digital, Automação e IA",
    description: "Plataforma de serviços digitais especializada em Marketing Digital, Automação e Inteligência Artificial. Soluções inovadoras com tecnologias de ponta.",
    siteName: "AidaEon",
  },
  twitter: {
    card: "summary_large_image",
    title: "AidaEon - Marketing Digital, Automação e IA",
    description: "Plataforma de serviços digitais especializada em Marketing Digital, Automação e Inteligência Artificial.",
    creator: "@aidaeon",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexProvider>
            {children}
            <Toaster richColors position="top-right" />
          </ConvexProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
