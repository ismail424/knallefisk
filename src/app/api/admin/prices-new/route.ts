import { NextRequest, NextResponse } from 'next/server';
import { AuthUtils } from '../../../../lib/auth';
import { sql, initializeDatabase } from '../../../../lib/database';

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

    const prices = await request.json();

    // Clear existing prices and insert new ones (transaction)
    await sql`BEGIN`;
    
    try {
      await sql`DELETE FROM prices`;
      
      for (const price of prices) {
        await sql`
          INSERT INTO prices (
            title, price, sale_price, category, unit, weight,
            on_sale, is_visible, image_url
          ) VALUES (
            ${price.title}, ${price.price}, ${price.sale_price || null}, 
            ${price.category || ''}, ${price.unit || 'kg'}, ${price.weight || ''},
            ${price.on_sale || false}, ${price.is_visible !== false}, ${price.image || null}
          )
        `;
      }
      
      await sql`COMMIT`;
    } catch (error) {
      await sql`ROLLBACK`;
      throw error;
    }

    return NextResponse.json({ 
      success: true,
      message: 'Prices updated successfully in database' 
    });
  } catch (error) {
    console.error('Error saving prices:', error);
    return NextResponse.json({ error: 'Failed to save prices' }, { status: 500 });
  }
}
