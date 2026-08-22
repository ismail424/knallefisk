import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakta oss',
  description:
    'Kontakta Knallefisk – ring, mejla eller besök våra fiskbutiker i Borås och Skene. Telefonnummer, e-post, adresser och öppettider.',
  alternates: { canonical: '/kontakta_oss' },
  openGraph: {
    title: 'Kontakta oss – Knallefisk',
    description: 'Ring, mejla eller besök våra fiskbutiker i Borås och Skene.',
  },
};

export default function KontaktaOssLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
