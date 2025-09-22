import type { Metadata } from 'next';
import Order from '../../components/Order';

export const metadata: Metadata = {
  title: 'Beställ Online - Knallefisk | Enkel beställning av färsk fisk',
  description: 'Beställ färsk fisk och skaldjur online från Knallefisk. Enkel beställning, hämta i butik i Skene eller Borås.',
  keywords: 'beställa fisk online, fiskbeställning, online beställning, Knallefisk beställning, hämta butik',
  openGraph: {
    title: 'Beställ Online - Knallefisk',
    description: 'Beställ färsk fisk och skaldjur online från Knallefisk.',
  },
};

export default function BestallOnlinePage() {
  return <Order />;
}