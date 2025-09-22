import { NextRequest, NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';
import { AuthUtils } from '../../../../lib/auth';

const PRICES_BLOB_PATH = 'data/prices.json';
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

export async function GET() {
  try {
    if (!BLOB_TOKEN) {
      throw new Error('BLOB_READ_WRITE_TOKEN environment variable is not configured');
    }

    // Get all blobs to find our prices file
    const { blobs } = await list({ 
      prefix: 'data/prices',
      token: BLOB_TOKEN 
    });
    
    if (blobs.length === 0) {
      // Return empty array if no prices file exists yet
      return NextResponse.json([]);
    }

    // Get the latest prices file
    const pricesBlob = blobs[0];
    const response = await fetch(pricesBlob.url);
    const prices = await response.json();

    return NextResponse.json(prices);
  } catch (error) {
    console.error('Error fetching prices:', error);
    return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!BLOB_TOKEN) {
      throw new Error('BLOB_READ_WRITE_TOKEN environment variable is not configured');
    }

    // Check authentication
    const token = AuthUtils.getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const authPayload = AuthUtils.verifyToken(token);
    if (!authPayload) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const prices = await request.json();

    // Store prices in Vercel Blob
    const blob = await put(PRICES_BLOB_PATH, JSON.stringify(prices), {
      access: 'public',
      contentType: 'application/json',
      token: BLOB_TOKEN,
      allowOverwrite: true
    });

    return NextResponse.json({ 
      success: true, 
      url: blob.url,
      message: 'Prices updated successfully' 
    });
  } catch (error) {
    console.error('Error saving prices:', error);
    return NextResponse.json({ error: 'Failed to save prices' }, { status: 500 });
  }
}
