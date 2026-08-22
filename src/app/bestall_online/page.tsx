import type { Metadata } from 'next';
import Order from '../../components/Order';
import { pageOpenGraph } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Beställ online',
  description:
    'Beställ färsk fisk och skaldjur online från Knallefisk. Vi packar din beställning färsk och klar – hämta och betala i butiken i Borås eller Skene.',
  alternates: { canonical: '/bestall_online' },
  openGraph: pageOpenGraph(
    '/bestall_online',
    'Beställ online',
    'Beställ färsk fisk och skaldjur online – hämta i butik i Borås eller Skene.'
  ),
};

export default function BestallOnlinePage() {
  return <Order />;
}