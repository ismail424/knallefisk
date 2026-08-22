import type { Metadata } from 'next';
import { pageOpenGraph } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Hitta butik',
  description:
    'Hitta Knallefisks butiker i Borås och Skene. Adresser, öppettider, kartor och vägbeskrivningar till våra fiskbutiker.',
  alternates: { canonical: '/hitta_butik' },
  openGraph: pageOpenGraph(
    '/hitta_butik',
    'Hitta butik',
    'Adresser, öppettider och vägbeskrivningar till våra butiker i Borås och Skene.'
  ),
};

export default function HittaButikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
