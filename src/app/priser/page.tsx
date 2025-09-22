import type { Metadata } from 'next';
import Prices from '../../components/Prices';

export const metadata: Metadata = {
  title: 'Priser - Knallefisk | Färsk fisk och skaldjur',
  description: 'Se våra aktuella priser på färsk fisk och skaldjur. Lax, räkor, krabba och mycket mer från Knallefisk.',
  keywords: 'fiskpriser, lax pris, räkor pris, skaldjur priser, färsk fisk priser, Knallefisk priser',
  openGraph: {
    title: 'Priser - Knallefisk | Färsk fisk och skaldjur',
    description: 'Se våra aktuella priser på färsk fisk och skaldjur.',
  },
};

export default function PriserPage() {
  return <Prices />;
}