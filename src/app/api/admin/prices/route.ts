import { NextRequest, NextResponse } from 'next/server';
import { AuthUtils } from '../../../../lib/auth';
import { sql, initializeDatabase } from '../../../../lib/database';

interface Price {
  id?: string;
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

// Initialize database on first load
let dbInitialized = false;

async function ensureDatabase() {
  if (!dbInitialized) {
    await initializeDatabase();
    dbInitialized = true;
  }
}

export async function GET() {
  try {
    await ensureDatabase();
    
    // Fetch all prices from database
    const prices = await sql`
      SELECT 
        id::text,
        title,
        price,
        sale_price,
        category,
        unit,
        weight,
        on_sale,
        is_visible,
        image_url as image,
        created_at,
        updated_at
      FROM prices 
      ORDER BY updated_at DESC
    `;

    return NextResponse.json(prices);
  } catch (error) {
    console.error('Error fetching prices:', error);
    return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 });
  }
}

// POST - Create a new price
export async function POST(request: NextRequest) {
  try {
    await ensureDatabase();
    
    // Verify authentication
    const token = AuthUtils.getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const authPayload = AuthUtils.verifyToken(token);
    if (!authPayload || authPayload.role !== 'admin') {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const price: Price = await request.json();

    // Insert new price
    const result = await sql`
      INSERT INTO prices (
        title, price, sale_price, category, unit, weight,
        on_sale, is_visible, image_url
      ) VALUES (
        ${price.title}, ${price.price}, ${price.sale_price || null}, 
        ${price.category || ''}, ${price.unit || 'kg'}, ${price.weight || ''},
        ${price.on_sale || false}, ${price.is_visible !== false}, ${price.image || null}
      )
      RETURNING id::text, title, price, sale_price, category, unit, weight,
                on_sale, is_visible, image_url as image, created_at, updated_at
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating price:', error);
    return NextResponse.json({ error: 'Failed to create price' }, { status: 500 });
  }
}

// PATCH - Update a specific field or fields of a price
export async function PATCH(request: NextRequest) {
  try {
    await ensureDatabase();
    
    // Verify authentication
    const token = AuthUtils.getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const authPayload = AuthUtils.verifyToken(token);
    if (!authPayload || authPayload.role !== 'admin') {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const { id, ...updates } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    // Check what fields need updating
    const fieldsToUpdate: Record<string, string | number | boolean | null> = {};
    
    if (updates.title !== undefined) fieldsToUpdate.title = updates.title;
    if (updates.price !== undefined) fieldsToUpdate.price = updates.price;
    if (updates.sale_price !== undefined) fieldsToUpdate.sale_price = updates.sale_price || null;
    if (updates.category !== undefined) fieldsToUpdate.category = updates.category;
    if (updates.unit !== undefined) fieldsToUpdate.unit = updates.unit;
    if (updates.weight !== undefined) fieldsToUpdate.weight = updates.weight;
    if (updates.on_sale !== undefined) fieldsToUpdate.on_sale = updates.on_sale;
    if (updates.is_visible !== undefined) fieldsToUpdate.is_visible = updates.is_visible;
    if (updates.image !== undefined) fieldsToUpdate.image_url = updates.image || null;

    if (Object.keys(fieldsToUpdate).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    // Dynamically build SET clause - only update provided fields
    let result;
    if (updates.title !== undefined && Object.keys(fieldsToUpdate).length === 1) {
      result = await sql`UPDATE prices SET title = ${updates.title}, updated_at = NOW() WHERE id = ${id} RETURNING id::text, title, price, sale_price, category, unit, weight, on_sale, is_visible, image_url as image, created_at, updated_at`;
    } else if (updates.price !== undefined && Object.keys(fieldsToUpdate).length === 1) {
      result = await sql`UPDATE prices SET price = ${updates.price}, updated_at = NOW() WHERE id = ${id} RETURNING id::text, title, price, sale_price, category, unit, weight, on_sale, is_visible, image_url as image, created_at, updated_at`;
    } else if (updates.sale_price !== undefined && Object.keys(fieldsToUpdate).length === 1) {
      result = await sql`UPDATE prices SET sale_price = ${updates.sale_price || null}, updated_at = NOW() WHERE id = ${id} RETURNING id::text, title, price, sale_price, category, unit, weight, on_sale, is_visible, image_url as image, created_at, updated_at`;
    } else if (updates.on_sale !== undefined && Object.keys(fieldsToUpdate).length === 1) {
      result = await sql`UPDATE prices SET on_sale = ${updates.on_sale}, updated_at = NOW() WHERE id = ${id} RETURNING id::text, title, price, sale_price, category, unit, weight, on_sale, is_visible, image_url as image, created_at, updated_at`;
    } else if (updates.is_visible !== undefined && Object.keys(fieldsToUpdate).length === 1) {
      result = await sql`UPDATE prices SET is_visible = ${updates.is_visible}, updated_at = NOW() WHERE id = ${id} RETURNING id::text, title, price, sale_price, category, unit, weight, on_sale, is_visible, image_url as image, created_at, updated_at`;
    } else if (updates.image !== undefined && Object.keys(fieldsToUpdate).length === 1) {
      result = await sql`UPDATE prices SET image_url = ${updates.image || null}, updated_at = NOW() WHERE id = ${id} RETURNING id::text, title, price, sale_price, category, unit, weight, on_sale, is_visible, image_url as image, created_at, updated_at`;
    } else {
      // Multiple fields - update all provided
      result = await sql`
        UPDATE prices SET
          title = ${fieldsToUpdate.title !== undefined ? fieldsToUpdate.title : sql`title`},
          price = ${fieldsToUpdate.price !== undefined ? fieldsToUpdate.price : sql`price`},
          sale_price = ${fieldsToUpdate.sale_price !== undefined ? fieldsToUpdate.sale_price : sql`sale_price`},
          category = ${fieldsToUpdate.category !== undefined ? fieldsToUpdate.category : sql`category`},
          unit = ${fieldsToUpdate.unit !== undefined ? fieldsToUpdate.unit : sql`unit`},
          weight = ${fieldsToUpdate.weight !== undefined ? fieldsToUpdate.weight : sql`weight`},
          on_sale = ${fieldsToUpdate.on_sale !== undefined ? fieldsToUpdate.on_sale : sql`on_sale`},
          is_visible = ${fieldsToUpdate.is_visible !== undefined ? fieldsToUpdate.is_visible : sql`is_visible`},
          image_url = ${fieldsToUpdate.image_url !== undefined ? fieldsToUpdate.image_url : sql`image_url`},
          updated_at = NOW()
        WHERE id = ${id}
        RETURNING id::text, title, price, sale_price, category, unit, weight,
                  on_sale, is_visible, image_url as image, created_at, updated_at
      `;
    }

    if (result.length === 0) {
      return NextResponse.json({ error: 'Price not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating price:', error);
    return NextResponse.json({ error: 'Failed to update price' }, { status: 500 });
  }
}

// DELETE - Delete a specific price
export async function DELETE(request: NextRequest) {
  try {
    await ensureDatabase();
    
    // Verify authentication
    const token = AuthUtils.getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const authPayload = AuthUtils.verifyToken(token);
    if (!authPayload || authPayload.role !== 'admin') {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
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
