import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { AppProviders } from "@/components/providers/AppProviders";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartToast } from "@/components/cart/CartToast";
import { ProfessionalModal } from "@/components/pro/ProfessionalModal";
import { ProfessionalAutoInvite } from "@/components/pro/ProfessionalAutoInvite";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Belleza, bienestar y formación`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  keywords: [
    "belleza",
    "bienestar",
    "cuidado personal",
    "cosmética natural",
    "barbería",
    "micropigmentación",
    "academia de belleza",
    "spa",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Belleza, bienestar y formación`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Belleza, bienestar y formación`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
  category: "beauty",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf6" },
    { media: "(prefers-color-scheme: dark)", color: "#153b2a" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-dvh bg-warm-white font-sans text-soft-black antialiased">
        <AppProviders>
          <a
            href="#contenido"
            className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-forest px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] text-warm-white transition-transform focus:translate-y-0"
          >
            Saltar al contenido
          </a>
          <Navbar />
          <main id="contenido">{children}</main>
          <Footer />
          <WhatsAppFab />
          <CartDrawer />
          <CartToast />
          <ProfessionalModal />
          <ProfessionalAutoInvite />
        </AppProviders>
      </body>
    </html>
  );
}
