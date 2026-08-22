import type { Metadata } from 'next';
import Prices from '../../components/Prices';
import { pageOpenGraph } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Priser',
  description:
    'Se våra aktuella priser på färsk fisk och skaldjur – lax, räkor, krabba och mycket mer. Priserna uppdateras löpande av oss i butiken.',
  alternates: { canonical: '/priser' },
  openGraph: pageOpenGraph('/priser', 'Priser', 'Aktuella priser på färsk fisk och skaldjur.'),
};

export default function PriserPage() {
  return <Prices />;
}