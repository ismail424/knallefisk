import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { AuthUtils } from '@/lib/auth';
import { RateLimiter } from '@/lib/rate-limiter';

interface OrderInput {
  name: string;
  phone: string;
  email: string;
  date: string;
  message: string;
  location: string;
}

const REQUIRED_FIELDS: (keyof OrderInput)[] = ['name', 'phone', 'email', 'date', 'message', 'location'];
const MAX_FIELD_LENGTH = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FONT = 'Arial, Helvetica, sans-serif';

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

// Header injection guard: a newline in a header value can forge extra headers
function isSingleLine(value: string): boolean {
  return !/[\r\n]/.test(value);
}

function parseOrder(body: unknown): OrderInput | null {
  if (typeof body !== 'object' || body === null) return null;
  const raw = body as Record<string, unknown>;
  const order = {} as OrderInput;

  for (const field of REQUIRED_FIELDS) {
    const value = raw[field];
    if (typeof value !== 'string') return null;
    const trimmed = value.trim();
    if (!trimmed || trimmed.length > MAX_FIELD_LENGTH) return null;
    order[field] = trimmed;
  }

  if (!EMAIL_PATTERN.test(order.email) || !isSingleLine(order.email)) return null;
  if (!isSingleLine(order.name)) return null;

  return order;
}

// --- Notification to the shop ---

function renderOrderText(order: OrderInput): string {
  return [
    'NY BESTÄLLNING',
    '',
    `Kund: ${order.name}`,
    `Telefon: ${order.phone}`,
    `E-post: ${order.email}`,
    '',
    'Beställning:',
    order.message,
    '',
    `Hämtning: ${order.date}`,
    `Plats: ${order.location}`
  ].join('\n');
}

// Styles are inlined rather than in a <style> block: several clients strip <head>
function renderOrderHtml(order: OrderInput): string {
  const sectionTitle = 'font-size:20px;font-weight:bold;margin-bottom:10px;color:#333;';
  const contactItem = 'margin-bottom:8px;font-size:16px;color:#333;';

  return `<div style="font-family:${FONT};background-color:#f5f5f5;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background-color:#ffffff;padding:30px;border-radius:8px;">
    <h1 style="font-size:28px;font-weight:bold;margin:0 0 30px;text-align:center;color:#333;">NY BESTÄLLNING</h1>

    <div style="margin-bottom:25px;">
      <div style="${sectionTitle}">KUND:</div>
      <div style="font-size:16px;line-height:1.6;">
        <div style="font-size:20px;font-weight:bold;color:#007bff;margin-top:10px;">${escapeHtml(order.name)}</div>
        <div style="${contactItem}">📞 ${escapeHtml(order.phone)}</div>
        <div style="${contactItem}">✉️ ${escapeHtml(order.email)}</div>
      </div>
    </div>

    <div style="margin-bottom:25px;">
      <div style="${sectionTitle}">BESTÄLLNING:</div>
      <div style="font-size:18px;font-weight:bold;line-height:1.5;padding:15px;border-left:4px solid #007bff;color:#333;">
        ${escapeMultiline(order.message)}
      </div>
    </div>

    <div style="margin-bottom:25px;">
      <div style="${sectionTitle}">HÄMTNING:</div>
      <div style="padding:15px;">
        <div style="font-size:18px;font-weight:bold;margin-bottom:8px;color:#333;">📅 ${escapeHtml(order.date)}</div>
        <div style="font-size:18px;font-weight:bold;color:#333;">📍 ${escapeHtml(order.location)}</div>
      </div>
    </div>

    <div style="text-align:center;border-top:2px solid #28a745;padding-top:20px;">
      <div style="font-size:16px;color:#28a745;font-weight:bold;">✅ Beställning mottagen</div>
    </div>
  </div>
</div>`;
}

// --- Confirmation to the customer ---

function renderConfirmationText(order: OrderInput): string {
  return [
    `Hej ${order.name}, tack för din beställning!`,
    '',
    `Beställning: ${order.message}`,
    `Upphämtning: ${order.date}`,
    `Plats: ${order.location}`,
    '',
    'Vi kontaktar dig vid eventuella frågor.',
    'Knallefisk'
  ].join('\n');
}

function renderConfirmationHtml(order: OrderInput): string {
  const infoLine = 'font-size:16px;margin-bottom:10px;color:#333;';

  return `<div style="font-family:${FONT};background-color:#f5f5f5;padding:30px;">
  <div style="max-width:500px;margin:0 auto;background-color:#ffffff;padding:40px 30px;border-radius:8px;text-align:center;">
    <div style="font-size:48px;color:#28a745;margin-bottom:20px;">✅</div>

    <div style="font-size:24px;font-weight:bold;color:#333;margin-bottom:15px;">Vi har tagit emot din beställning</div>
    <div style="font-size:16px;color:#666;margin-bottom:30px;">Hej ${escapeHtml(order.name)}, tack för din beställning!</div>

    <div style="background-color:#f8f9fa;padding:20px;border-radius:6px;text-align:left;margin-bottom:25px;">
      <div style="${infoLine}"><strong>Beställning:</strong> ${escapeMultiline(order.message)}</div>
      <div style="${infoLine}"><strong>Upphämtning:</strong> ${escapeHtml(order.date)}</div>
      <div style="${infoLine}"><strong>Plats:</strong> ${escapeHtml(order.location)}</div>
    </div>

    <div style="color:#666;font-size:14px;">Vi kontaktar dig vid eventuella frågor.</div>
  </div>
</div>`;
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = AuthUtils.getClientIP(request);

    // Namespaced so order submissions don't consume the admin login budget
    const rateLimitResult = await RateLimiter.checkRateLimit(`order:${clientIP}`);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'För många beställningar. Försök igen om en stund eller ring oss.' },
        { status: 429 }
      );
    }

    const order = parseOrder(await request.json());
    if (!order) {
      return NextResponse.json({ error: 'Ogiltiga uppgifter' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.ORDER_FROM_EMAIL;
    const recipients = (process.env.ORDER_RECIPIENTS || '')
      .split(',')
      .map((address) => address.trim())
      .filter(Boolean);

    if (!apiKey || !from || recipients.length === 0) {
      console.error('Order email is not configured (RESEND_API_KEY / ORDER_FROM_EMAIL / ORDER_RECIPIENTS)');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    const [notification, confirmation] = await Promise.all([
      resend.emails.send({
        from,
        to: recipients,
        replyTo: order.email,
        subject: `Ny beställning - ${order.name} (${order.location} ${order.date})`,
        text: renderOrderText(order),
        html: renderOrderHtml(order)
      }),
      resend.emails.send({
        from,
        to: [order.email],
        replyTo: recipients[0],
        subject: 'Vi har tagit emot din beställning - Knallefisk',
        text: renderConfirmationText(order),
        html: renderConfirmationHtml(order)
      })
    ]);

    // The shop notification is the order; without it nothing was received
    if (notification.error) {
      console.error('Resend error (notification):', notification.error);
      return NextResponse.json({ error: 'Failed to send order' }, { status: 502 });
    }

    // A missing customer receipt is worth logging but must not fail the order
    if (confirmation.error) {
      console.error('Resend error (customer confirmation):', confirmation.error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending order:', error);
    return NextResponse.json({ error: 'Failed to send order' }, { status: 500 });
  }
}
