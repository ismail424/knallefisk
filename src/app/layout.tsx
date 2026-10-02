import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MUIThemeProvider from "../components/ThemeProvider";
import { SITE_URL, SITE_NAME, TAGLINE, STORES, CONTACT_EMAILS, FOUNDED_YEAR } from "../lib/site";
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
    default: `${SITE_NAME} – Fiskbutik i Borås & Skene | Färsk fisk & skaldjur`,
    template: `%s – ${SITE_NAME}`,
  },
  description:
    "Familjeägd fiskbutik i Borås och Skene sedan 2006. Dagsfärsk fisk och skaldjur från Göteborgs fiskauktion. Beställ online och hämta i butik.",
  applicationName: SITE_NAME,
  category: "food",
  keywords: [
    "fiskbutik Borås",
    "fiskhandel Borås",
    "fiskbutik Skene",
    "skaldjur Borås",
    "räkor Borås",
    "färsk fisk Sjuhärad",
    "beställa fisk online",
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
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Knallefisk – Färska fisken över hela disken",
      },
    ],
  },
  // Card type only — title/description/image fall back to each page's own
  // OpenGraph values instead of leaking the homepage text onto subpages.
  twitter: {
    card: "summary_large_image",
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
  colorScheme: "light",
};

const LOGO_URL = `${SITE_URL}/img/logo-email.png`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: "Knalle Fisk",
      url: SITE_URL,
      logo: LOGO_URL,
      // Both stores belong to one business — ties the two Google listings together
      subOrganization: STORES.map((store) => ({ "@id": `${SITE_URL}/#${store.id}` })),
      slogan: TAGLINE,
      foundingDate: String(FOUNDED_YEAR),
      email: CONTACT_EMAILS[0],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "sv-SE",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    ...STORES.map((store) => ({
      "@type": ["GroceryStore", "LocalBusiness"],
      "@id": `${SITE_URL}/#${store.id}`,
      name: store.fullName,
      ...(store.alternateNames && { alternateName: store.alternateNames }),
      ...(store.googleMapsUrl && { sameAs: [store.googleMapsUrl] }),
      description: `Fiskbutik i ${store.city} med dagsfärsk fisk och skaldjur från Göteborgs fiskauktion. Familjeägd fiskhandel sedan ${FOUNDED_YEAR}.`,
      url: `${SITE_URL}/hitta_butik`,
      telephone: store.phoneE164,
      email: CONTACT_EMAILS[0],
      // store_front.webp shows the Skene shop; don't attach it to Borås
      image:
        store.id === "skene"
          ? [`${SITE_URL}/img/store_front.webp`, `${SITE_URL}/og.jpg`]
          : [`${SITE_URL}/og.jpg`],
      logo: LOGO_URL,
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      address: {
        "@type": "PostalAddress",
        streetAddress: store.streetAddress,
        postalCode: store.postalCode,
        addressLocality: store.city,
        addressRegion: "Västra Götalands län",
        addressCountry: "SE",
      },
      geo: { "@type": "GeoCoordinates", ...store.geo },
      hasMap: store.googleMapsUrl ?? store.directionsUrl,
      areaServed: ["Borås", "Skene", "Mark", "Sjuhärad"],
      openingHoursSpecification: store.openingHoursSpec,
      priceRange: "$$",
      currenciesAccepted: "SEK",
      potentialAction: {
        "@type": "OrderAction",
        target: `${SITE_URL}/bestall_online`,
      },
    })),
  ],
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
