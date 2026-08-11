import { OrderInput } from './types';

interface Store {
  phone: string;
}

export interface RenderedEmail {
  subject: string;
  text: string;
  html: string;
}

const SITE_URL = 'https://www.knallefisk.se';

const STORES: Record<string, Store> = {
  Skene: { phone: '073 535 09 17' },
  Borås: { phone: '070 836 59 71' }
};

const MONTHS = [
  'januari', 'februari', 'mars', 'april', 'maj', 'juni',
  'juli', 'augusti', 'september', 'oktober', 'november', 'december'
];

// Email clients ignore stylesheets and most modern CSS, so every rule is
// inline and the layout is tables. Colours match the site: teal #448f9b.
const TEAL = '#448f9b';
const TEAL_TINT = '#eef5f6';
const TEAL_PALE = '#d3e7ea';
const INK = '#1f2937';
const MUTED = '#6b7280';
const BORDER = '#e3e8ea';
const CANVAS = '#eff2f3';
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeMultiline(value: string): string {
  return escapeHtml(value).replace(/\n/g, '<br>');
}

function telHref(phone: string): string {
  return phone.replace(/\s/g, '');
}

/** "2026-08-15" -> "15 augusti 2026". Falls back to the raw value. */
function formatDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return value;
  const month = MONTHS[Number(match[2]) - 1];
  return month ? `${Number(match[3])} ${month} ${match[1]}` : value;
}

/** "2026-08-15" -> "15 aug", for subject lines that get truncated on mobile. */
function formatShortDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return value;
  const month = MONTHS[Number(match[2]) - 1];
  return month ? `${Number(match[3])} ${month.slice(0, 3)}` : value;
}

// `preheader` is the grey snippet inboxes show next to the subject. Without
// one, clients scrape the first body text, which reads as broken.
function layout(preheader: string, body: string, footer: string): string {
  return `<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
</head>
<body style="margin:0;padding:0;background-color:${CANVAS};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${CANVAS};">
  <tr>
    <td align="center" style="padding:28px 12px 40px;">

      <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;background-color:#ffffff;border:1px solid ${BORDER};border-radius:16px;">
        <tr>
          <td style="padding:28px;font-family:${FONT};">
${body}
          </td>
        </tr>
      </table>

      <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;">
        <tr>
          <td align="center" style="padding:20px 24px 0;font-family:${FONT};font-size:13px;line-height:1.7;color:${MUTED};">
${footer}
          </td>
        </tr>
      </table>

    </td>
  </tr>
</table>
</body>
</html>`;
}

/** Solid teal panel — the one thing the reader must not miss. */
function pickupBanner(dateLabel: string, location: string): string {
  const line = 'margin:0;font-size:23px;line-height:1.35;font-weight:700;color:#ffffff;';

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:22px;">
  <tr>
    <td style="padding:22px 26px;background-color:${TEAL};border-radius:12px;">
      <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${TEAL_PALE};">Hämtas</p>
      <p style="${line}"><span style="display:inline-block;width:30px;">📅</span>${escapeHtml(dateLabel)}</p>
      <p style="${line}margin-top:6px;"><span style="display:inline-block;width:30px;">📍</span>${escapeHtml(location)}</p>
    </td>
  </tr>
</table>`;
}

/** Tinted panel holding the order lines — the largest text in the mail. */
function orderPanel(label: string, message: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:26px;">
  <tr>
    <td style="padding:20px 24px;background-color:${TEAL_TINT};border-radius:12px;">
      <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${TEAL};">${label}</p>
      <p style="margin:0;font-size:21px;line-height:1.55;font-weight:600;color:${INK};">${escapeMultiline(message)}</p>
    </td>
  </tr>
</table>`;
}

/**
 * Order notification sent to the shop owners. Optimised for a two-second
 * scan on a phone: when and where first, then what to prepare, then a
 * tap-to-call button for the customer.
 */
export function renderOrderEmail(order: OrderInput): RenderedEmail {
  const body = `
<p style="margin:0 0 18px;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${MUTED};">Ny beställning</p>

${pickupBanner(formatDate(order.date), order.location)}
${orderPanel('Beställning', order.message)}

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BORDER};border-radius:12px;">
  <tr>
    <td style="padding:20px 24px;">
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${MUTED};">Kund</p>
      <p style="margin:0 0 16px;font-size:20px;line-height:1.35;font-weight:700;color:${INK};">${escapeHtml(order.name)}</p>
      <p style="margin:0 0 12px;">
        <a href="tel:${escapeHtml(telHref(order.phone))}" style="display:inline-block;padding:13px 26px;background-color:${TEAL};color:#ffffff;font-size:17px;font-weight:700;text-decoration:none;border-radius:10px;white-space:nowrap;">Ring ${escapeHtml(order.phone)}</a>
      </p>
      <p style="margin:0;font-size:15px;">
        <a href="mailto:${escapeHtml(order.email)}" style="color:${TEAL};text-decoration:none;">${escapeHtml(order.email)}</a>
      </p>
    </td>
  </tr>
</table>`;

  return {
    subject: `Ny beställning ${formatShortDate(order.date)} · ${order.location} · ${order.name}`,
    text: [
      'NY BESTÄLLNING',
      '',
      `HÄMTAS: ${formatDate(order.date)} - ${order.location}`,
      '',
      'Beställning:',
      order.message,
      '',
      `Kund: ${order.name}`,
      `Telefon: ${order.phone}`,
      `E-post: ${order.email}`,
      '',
      'Svara på detta mail för att mejla kunden direkt.'
    ].join('\n'),
    html: layout(
      `${formatDate(order.date)} · ${order.location} · ${order.message.split('\n')[0]}`,
      body,
      `Svara på detta mail för att mejla ${escapeHtml(order.name)} direkt.`
    )
  };
}

/** Receipt sent to the customer who placed the order. */
export function renderConfirmationEmail(order: OrderInput): RenderedEmail {
  const store = STORES[order.location];
  const firstName = order.name.split(' ')[0];

  const body = `
<p style="margin:0 0 16px;font-size:54px;line-height:1;text-align:center;">✅</p>
<p style="margin:0 0 8px;font-size:22px;line-height:1.3;font-weight:700;color:${INK};text-align:center;">Vi har tagit emot din beställning</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.6;color:${MUTED};text-align:center;">Hej ${escapeHtml(firstName)}, tack! Vi hör av oss om något behöver bekräftas.</p>

${pickupBanner(formatDate(order.date), order.location)}
${orderPanel('Din beställning', order.message)}

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BORDER};border-radius:12px;">
  <tr>
    <td style="padding:18px 24px;font-size:15px;line-height:1.6;color:${INK};">
      Betalning sker i butik vid upphämtning.${store ? `<br>Frågor? Ring <a href="tel:${telHref(store.phone)}" style="color:${TEAL};font-weight:700;text-decoration:none;white-space:nowrap;">${store.phone}</a>` : ''}
    </td>
  </tr>
</table>`;

  return {
    subject: 'Vi har tagit emot din beställning - Knallefisk',
    text: [
      `Hej ${firstName}, tack för din beställning!`,
      '',
      `HÄMTAS: ${formatDate(order.date)}`,
      `Plats: ${order.location}`,
      '',
      'Din beställning:',
      order.message,
      '',
      `Betalning sker i butik vid upphämtning.${store ? ` Frågor? Ring ${store.phone}.` : ''}`,
      '',
      'Knallefisk - Färska fisken över hela disken',
      SITE_URL
    ].join('\n'),
    html: layout(
      `Upphämtning ${formatDate(order.date)} i ${order.location}`,
      body,
      `<strong style="color:${INK};">Knallefisk</strong> — Färska fisken över hela disken<br>
<a href="${SITE_URL}" style="color:${TEAL};text-decoration:none;">knallefisk.se</a>`
    )
  };
}
