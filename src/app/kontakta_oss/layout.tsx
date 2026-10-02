import type { Metadata } from 'next';
import { pageOpenGraph, breadcrumbJsonLd } from '../../lib/site';
import JsonLd from '../../components/JsonLd';

export const metadata: Metadata = {
  title: 'Kontakta oss',
  description:
    'Kontakta Knallefisk – ring, mejla eller besök våra fiskbutiker i Borås och Skene. Telefonnummer, e-post, adresser och öppettider.',
  alternates: { canonical: '/kontakta_oss' },
  openGraph: pageOpenGraph(
    '/kontakta_oss',
    'Kontakta oss',
    'Ring, mejla eller besök våra fiskbutiker i Borås och Skene.'
  ),
};

export default function KontaktaOssLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd('/kontakta_oss', 'Kontakta oss')} />
      {children}
    </>
  );
}
