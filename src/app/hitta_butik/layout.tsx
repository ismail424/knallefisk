import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hitta Butik - Knallefisk | Butiker i Skene och Borås',
  description: 'Hitta Knallefisk butiker i Skene och Borås. Adresser, öppettider och vägbeskrivningar till våra fiskbutiker.',
  keywords: 'Knallefisk butik, Skene fiskbutik, Borås fiskbutik, hitta butik, öppettider, adress',
  openGraph: {
    title: 'Hitta Butik - Knallefisk',
    description: 'Hitta Knallefisk butiker i Skene och Borås.',
  },
};

export default function HittaButikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
