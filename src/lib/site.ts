/**
 * Single source of truth for site-wide facts: stores, opening hours,
 * contact details and the public URL. Header, footer, pages, sitemap and
 * the LocalBusiness structured data all read from here so the numbers can
 * never drift apart again.
 */

export const SITE_URL = 'https://www.knallefisk.se';
export const SITE_NAME = 'Knallefisk';
export const TAGLINE = 'Färska fisken över hela disken';
export const FOUNDED_YEAR = 2006;

export const CONTACT_EMAILS = ['rsacic@yahoo.se', 'almir_hamza@hotmail.com'];

export interface DayHours {
  day: string;
  /** e.g. "10:00–18:00", or null when closed */
  hours: string | null;
}

export interface Store {
  id: 'boras' | 'skene';
  /** Short name used in UI, e.g. "Borås" */
  name: string;
  /** Full display name, e.g. "Knallefisk Borås" */
  fullName: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  /** Display format, e.g. "070 836 59 71" */
  phone: string;
  /** E.164 format for tel: links and structured data, e.g. "+46708365971" */
  phoneE164: string;
  /** Monday–Sunday, in order */
  hours: DayHours[];
  /** Compact one-line summary for footer and cards */
  hoursSummary: string;
  /** Google Maps embed for iframes */
  mapEmbed: string;
  /** Link that opens directions in Google Maps */
  directionsUrl: string;
  /** schema.org OpeningHoursSpecification */
  openingHoursSpec: Array<{
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
}

export const STORES: Store[] = [
  {
    id: 'boras',
    name: 'Borås',
    fullName: 'Knallefisk Borås',
    streetAddress: 'Ålgårdsvägen 3',
    postalCode: '506 30',
    city: 'Borås',
    phone: '070 836 59 71',
    phoneE164: '+46708365971',
    hours: [
      { day: 'Måndag', hours: null },
      { day: 'Tisdag', hours: '10:00–18:00' },
      { day: 'Onsdag', hours: '10:00–18:00' },
      { day: 'Torsdag', hours: '10:00–18:00' },
      { day: 'Fredag', hours: '10:00–19:00' },
      { day: 'Lördag', hours: '10:00–15:00' },
      { day: 'Söndag', hours: null },
    ],
    hoursSummary: 'Tis–Tor 10–18 · Fre 10–19 · Lör 10–15',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1065.0512317216635!2d12.933504154929423!3d57.73170229381581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465aa7204c244b79%3A0x1d516f3454bd77dd!2sKnalle%20Fisk!5e0!3m2!1ssv!2sse!4v1616927781991!5m2!1ssv!2sse',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Knalle+Fisk%2C+%C3%85lg%C3%A5rdsv%C3%A4gen+3%2C+506+30+Bor%C3%A5s',
    openingHoursSpec: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday'],
        opens: '10:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday'],
        opens: '10:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '15:00',
      },
    ],
  },
  {
    id: 'skene',
    name: 'Skene',
    fullName: 'Knallefisk Skene',
    streetAddress: 'Örbyvägen 27',
    postalCode: '511 61',
    city: 'Skene',
    phone: '073 535 09 17',
    phoneE164: '+46735350917',
    hours: [
      { day: 'Måndag', hours: null },
      { day: 'Tisdag', hours: null },
      { day: 'Onsdag', hours: null },
      { day: 'Torsdag', hours: '10:00–18:00' },
      { day: 'Fredag', hours: '10:00–19:00' },
      { day: 'Lördag', hours: '10:00–15:00' },
      { day: 'Söndag', hours: null },
    ],
    hoursSummary: 'Tor 10–18 · Fre 10–19 · Lör 10–15',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d536.1354135958156!2d12.647960488173517!3d57.48614171965853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x96f6138a27b74bc5!2zNTfCsDI5JzEwLjEiTiAxMsKwMzgnNTQuNiJF!5e0!3m2!1ssv!2sse!4v1667306940644!5m2!1ssv!2sse',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Knalle+Fisk%2C+%C3%96rbyv%C3%A4gen+27%2C+511+61+Skene',
    openingHoursSpec: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Thursday'],
        opens: '10:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday'],
        opens: '10:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '15:00',
      },
    ],
  },
];

/**
 * Next.js replaces (not merges) a page-level `openGraph` object, so every
 * page that sets its own og-title must restate the shared fields or lose
 * the share image. Build page og-objects through this helper.
 */
export function pageOpenGraph(path: string, title: string, description: string) {
  return {
    title: `${title} – ${SITE_NAME}`,
    description,
    url: `${SITE_URL}${path}`,
    siteName: SITE_NAME,
    locale: 'sv_SE',
    type: 'website' as const,
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} – ${TAGLINE}`,
      },
    ],
  };
}

export const NAV_LINKS = [
  { name: 'Hem', url: '/' },
  { name: 'Priser', url: '/priser' },
  { name: 'Om oss', url: '/om_oss' },
  { name: 'Hitta butik', url: '/hitta_butik' },
  { name: 'Kontakta oss', url: '/kontakta_oss' },
];
