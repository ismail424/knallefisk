import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MUIThemeProvider from "../components/ThemeProvider";

export const metadata: Metadata = {
  title: "Knallefisk - Färska delikatesser från hav och sjö",
  description: "Kvalitetsfisk och skaldjur från Göteborg sedan 2006. Beställ online eller besök vår butik.",
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