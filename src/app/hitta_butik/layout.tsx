import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hitta butik',
  description:
    'Hitta Knallefisks butiker i Borås och Skene. Adresser, öppettider, kartor och vägbeskrivningar till våra fiskbutiker.',
  alternates: { canonical: '/hitta_butik' },
  openGraph: {
    title: 'Hitta butik – Knallefisk',
    description: 'Adresser, öppettider och vägbeskrivningar till våra butiker i Borås och Skene.',
  },
};

export default function HittaButikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
