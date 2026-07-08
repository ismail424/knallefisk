import { NextRequest, NextResponse } from 'next/server';
import { AuthUtils } from '../../../../lib/auth';
import { sql } from '../../../../lib/database';

interface PriceInput {
  title: string;
  price: string;
  sale_price?: string;
  category?: string;
  unit: string;
  weight?: string;
  on_sale: boolean;
  is_visible: boolean;
  image?: string;
}

const PRICE_COLUMNS = sql`
  id::text, title, price, sale_price, category, unit, weight,
  on_sale, is_visible, image_url as image, created_at, updated_at
`;

function isAdmin(request: NextRequest): boolean {
  const token = AuthUtils.getTokenFromRequest(request);
  if (!token) return false;
  const payload = AuthUtils.verifyToken(token);
  return payload?.role === 'admin';
}

// GET - Public: only visible prices. Admin: all prices.
export async function GET(request: NextRequest) {
  try {
    const prices = isAdmin(request)
      ? await sql`SELECT ${PRICE_COLUMNS} FROM prices ORDER BY updated_at DESC`
      : await sql`SELECT ${PRICE_COLUMNS} FROM prices WHERE is_visible = true ORDER BY updated_at DESC`;

    return NextResponse.json(prices);
  } catch (error) {
    console.error('Error fetching prices:', error);
    return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 });
  }
}

// POST - Create a new price
export async function POST(request: NextRequest) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const price: PriceInput = await request.json();

    if (!price.title || !price.price) {
      return NextResponse.json({ error: 'Title and price are required' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO prices (
        title, price, sale_price, category, unit, weight,
        on_sale, is_visible, image_url
      ) VALUES (
        ${price.title}, ${price.price}, ${price.sale_price || null},
        ${price.category || ''}, ${price.unit || 'kg'}, ${price.weight || ''},
        ${price.on_sale || false}, ${price.is_visible !== false}, ${price.image || null}
      )
      RETURNING ${PRICE_COLUMNS}
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating price:', error);
    return NextResponse.json({ error: 'Failed to create price' }, { status: 500 });
  }
}

// PATCH - Update provided fields of a price
export async function PATCH(request: NextRequest) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, ...updates }: { id?: string } & Partial<PriceInput> = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    const existing = await sql`
      SELECT title, price, sale_price, category, unit, weight,
             on_sale, is_visible, image_url
      FROM prices WHERE id = ${id}
    `;

    if (existing.length === 0) {
      return NextResponse.json({ error: 'Price not found' }, { status: 404 });
    }

    // Merge provided fields onto the existing row, then write all columns back
    const current = existing[0];
    const merged = {
      title: updates.title ?? current.title,
      price: updates.price ?? current.price,
      sale_price: updates.sale_price !== undefined ? (updates.sale_price || null) : current.sale_price,
      category: updates.category ?? current.category,
      unit: updates.unit ?? current.unit,
      weight: updates.weight ?? current.weight,
      on_sale: updates.on_sale ?? current.on_sale,
      is_visible: updates.is_visible ?? current.is_visible,
      image_url: updates.image !== undefined ? (updates.image || null) : current.image_url
    };

    const result = await sql`
      UPDATE prices SET
        title = ${merged.title},
        price = ${merged.price},
        sale_price = ${merged.sale_price},
        category = ${merged.category},
        unit = ${merged.unit},
        weight = ${merged.weight},
        on_sale = ${merged.on_sale},
        is_visible = ${merged.is_visible},
        image_url = ${merged.image_url},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING ${PRICE_COLUMNS}
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating price:', error);
    return NextResponse.json({ error: 'Failed to update price' }, { status: 500 });
  }
}

// DELETE - Delete a specific price
export async function DELETE(request: NextRequest) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    const result = await sql`
      DELETE FROM prices
      WHERE id = ${id}
      RETURNING id
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Price not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, id: result[0].id });
  } catch (error) {
    console.error('Error deleting price:', error);
    return NextResponse.json({ error: 'Failed to delete price' }, { status: 500 });
  }
}
