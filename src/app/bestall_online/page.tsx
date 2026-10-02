import type { Metadata } from 'next';
import Order from '../../components/Order';
import { pageOpenGraph, breadcrumbJsonLd } from '../../lib/site';
import JsonLd from '../../components/JsonLd';

export const metadata: Metadata = {
  title: 'Beställ fisk online – hämta i Borås & Skene',
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
  return (
    <>
      <JsonLd data={breadcrumbJsonLd('/bestall_online', 'Beställ online')} />
      <Order />
    </>
  );
}