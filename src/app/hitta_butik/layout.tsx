import type { Metadata } from 'next';
import { pageOpenGraph, breadcrumbJsonLd } from '../../lib/site';
import JsonLd from '../../components/JsonLd';

export const metadata: Metadata = {
  title: 'Fiskbutiker i Borås & Skene – öppettider & karta',
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
  return (
    <>
      <JsonLd data={breadcrumbJsonLd('/hitta_butik', 'Hitta butik')} />
      {children}
    </>
  );
}
