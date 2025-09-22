import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt - Knallefisk | Kontakta oss för färsk fisk',
  description: 'Kontakta Knallefisk för frågor om fisk och skaldjur. Hitta våra butiker i Skene och Borås. Telefon, e-post och öppettider.',
  keywords: 'kontakt Knallefisk, Skene fiskbutik, Borås fiskbutik, kontakta fiskhandlare, öppettider',
  openGraph: {
    title: 'Kontakt - Knallefisk',
    description: 'Kontakta Knallefisk för frågor om fisk och skaldjur.',
  },
};

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
