import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { AuthUtils } from '@/lib/auth';
import { RateLimiter } from '@/lib/rate-limiter';
import { OrderInput } from '@/lib/types';
import { renderOrderEmail, renderConfirmationEmail } from '@/lib/order-email';

const REQUIRED_FIELDS: (keyof OrderInput)[] = ['name', 'phone', 'email', 'date', 'message', 'location'];
const MAX_FIELD_LENGTH = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
    const notificationEmail = renderOrderEmail(order);
    const confirmationEmail = renderConfirmationEmail(order);

    const [notification, confirmation] = await Promise.all([
      resend.emails.send({
        from,
        to: recipients,
        replyTo: order.email,
        ...notificationEmail
      }),
      resend.emails.send({
        from,
        to: [order.email],
        // A freemail Reply-To on a knallefisk.se From costs ~2.5 SpamAssassin
        // points (FREEMAIL_FORGED_REPLYTO). Point this at an address on the
        // domain once Cloudflare Email Routing forwards it to the owners.
        replyTo: process.env.ORDER_REPLY_TO?.trim() || recipients[0],
        ...confirmationEmail
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
