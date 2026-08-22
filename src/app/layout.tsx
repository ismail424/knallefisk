import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MUIThemeProvider from "../components/ThemeProvider";
import { SITE_URL, SITE_NAME, TAGLINE, STORES, CONTACT_EMAILS } from "../lib/site";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} – ${TAGLINE}`,
    template: `%s – ${SITE_NAME}`,
  },
  description:
    "Familjeägd fiskhandel sedan 2006. Färsk fisk och skaldjur från Göteborgs fiskauktion till våra butiker i Borås och Skene. Beställ online och hämta i butik.",
  keywords: [
    "fisk",
    "skaldjur",
    "färsk fisk",
    "fiskbutik",
    "Borås",
    "Skene",
    "lax",
    "räkor",
    "krabba",
    "Knallefisk",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} – ${TAGLINE}`,
    description:
      "Familjeägd fiskhandel sedan 2006. Färsk fisk och skaldjur från Göteborgs fiskauktion till våra butiker i Borås och Skene.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "sv_SE",
    type: "website",
    images: [
      {
        url: "/img/store_front.webp",
        width: 1200,
        height: 630,
        alt: "Knallefisk – fiskbutik i Borås och Skene",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} – ${TAGLINE}`,
    description:
      "Familjeägd fiskhandel sedan 2006. Butiker i Borås och Skene.",
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

export const viewport: Viewport = {
  themeColor: "#448f9b",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": STORES.map((store) => ({
    "@type": "GroceryStore",
    "@id": `${SITE_URL}/#${store.id}`,
    name: store.fullName,
    description: `Färsk fisk och skaldjur i ${store.city}. Familjeägd fiskhandel sedan 2006.`,
    url: SITE_URL,
    telephone: `+46${store.phone.replace(/\s/g, "").slice(1)}`,
    email: CONTACT_EMAILS[0],
    image: `${SITE_URL}/img/store_front.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: store.streetAddress,
      postalCode: store.postalCode,
      addressLocality: store.city,
      addressCountry: "SE",
    },
    openingHoursSpecification: store.openingHoursSpec,
    priceRange: "$$",
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <AppRouterCacheProvider>
          <MUIThemeProvider>
            <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
              <Header />
              <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {children}
              </main>
              <Footer />
            </div>
          </MUIThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
