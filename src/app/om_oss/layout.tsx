import type { Metadata } from 'next';
import { pageOpenGraph } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Om oss',
  description:
    'Knallefisk är en familjeägd fiskhandel sedan 2006. Vi hämtar färsk fisk och skaldjur från Göteborgs fiskauktion till våra butiker i Borås och Skene.',
  alternates: { canonical: '/om_oss' },
  openGraph: pageOpenGraph(
    '/om_oss',
    'Om oss',
    'Familjeägd fiskhandel sedan 2006 med butiker i Borås och Skene.'
  ),
};

export default function OmOssLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
