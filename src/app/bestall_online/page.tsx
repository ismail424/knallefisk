import type { Metadata } from 'next';
import Order from '../../components/Order';

export const metadata: Metadata = {
  title: 'Beställ online',
  description:
    'Beställ färsk fisk och skaldjur online från Knallefisk. Vi packar din beställning färsk och klar – hämta och betala i butiken i Borås eller Skene.',
  alternates: { canonical: '/bestall_online' },
  openGraph: {
    title: 'Beställ online – Knallefisk',
    description: 'Beställ färsk fisk och skaldjur online – hämta i butik i Borås eller Skene.',
  },
};

export default function BestallOnlinePage() {
  return <Order />;
}