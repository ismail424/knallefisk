import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MUIThemeProvider from "../components/ThemeProvider";

export const metadata: Metadata = {
  title: "Knallefisk - Färska delikatesser från hav och sjö",
  description: "Kvalitetsfisk och skaldjur från Göteborg sedan 2006. Beställ online eller besök vår butik i Skene och Borås.",
  keywords: "fisk, skaldjur, färsk fisk, Göteborg, Skene, Borås, delikatesser, hav, sjö, kvalitetsfisk, lax, räkor, krabba",
  authors: [{ name: "Knallefisk" }],
  creator: "Knallefisk",
  publisher: "Knallefisk",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://yourwebsite.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Knallefisk - Färska delikatesser från hav och sjö",
    description: "Kvalitetsfisk och skaldjur från Göteborg sedan 2006. Beställ online eller besök vår butik.",
    url: 'https://yourwebsite.com', // Replace with your actual domain
    siteName: 'Knallefisk',
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Knallefisk - Färska delikatesser från hav och sjö",
    description: "Kvalitetsfisk och skaldjur från Göteborg sedan 2006.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <head>
        <script async src="https://kit.fontawesome.com/d929f5c8b7.js" crossOrigin="anonymous"></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Knallefisk",
              "description": "Kvalitetsfisk och skaldjur från Göteborg sedan 2006",
              "url": "https://yourwebsite.com", // Replace with your actual domain
              "telephone": "+46-XX-XXX-XX-XX", // Replace with actual phone
              "address": [
                {
                  "@type": "PostalAddress",
                  "streetAddress": "Your Street Address", // Replace with actual address
                  "addressLocality": "Skene",
                  "addressCountry": "SE"
                },
                {
                  "@type": "PostalAddress", 
                  "streetAddress": "Your Street Address", // Replace with actual address
                  "addressLocality": "Borås",
                  "addressCountry": "SE"
                }
              ],
              "servesCuisine": "Seafood",
              "priceRange": "$$",
              "openingHours": [
                "Mo-Fr 09:00-18:00",
                "Sa 09:00-15:00"
              ],
              "sameAs": [
                "https://facebook.com/yourpage", // Add if you have social media
                "https://instagram.com/yourpage"
              ]
            })
          }}
        />
      </head>
      <body>
        <MUIThemeProvider>
          <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <div style={{ flex: 1 }}>
              {children}
            </div>
            <Footer />
          </main>
        </MUIThemeProvider>
      </body>
    </html>
  );
}