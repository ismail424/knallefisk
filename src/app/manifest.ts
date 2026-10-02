import type { MetadataRoute } from 'next';
import { SITE_NAME, TAGLINE } from '../lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} – ${TAGLINE}`,
    short_name: SITE_NAME,
    description: 'Familjeägd fiskbutik i Borås och Skene sedan 2006.',
    start_url: '/',
    display: 'browser',
    background_color: '#f6f9fa',
    theme_color: '#448f9b',
    lang: 'sv-SE',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
