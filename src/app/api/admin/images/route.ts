import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { sql, initializeDatabase } from '../../../../lib/database';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

// Initialize database on first load
let dbInitialized = false;

async function ensureDatabase() {
  if (!dbInitialized) {
    await initializeDatabase();
    dbInitialized = true;
  }
}

// Verify authentication
async function verifyAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    
    if (!token) {
        return false;
    }
    
    try {
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch {
        return false;
    }
}

export async function GET() {
    try {
        await ensureDatabase();
        
        // Verify authentication
        if (!(await verifyAuth())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get all images from database
        const images = await sql`
            SELECT 
                id::text,
                name,
                url,
                blob_url,
                size_bytes as size,
                file_type,
                created_at as uploadDate
            FROM images 
            ORDER BY created_at DESC
        `;

        // Transform to expected format
        const imageList = images.map(img => ({
            id: img.id,
            name: img.name,
            url: img.url,
            size: img.size,
            uploadDate: img.uploaddate
        }));

        return NextResponse.json(imageList);
    } catch (error) {
        console.error('Error loading images:', error);
        return NextResponse.json({ error: 'Failed to load images' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await ensureDatabase();
        
        // Verify authentication
        if (!(await verifyAuth())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;
        
        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ 
                error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' 
            }, { status: 400 });
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            return NextResponse.json({ 
                error: 'File too large. Maximum size is 10MB.' 
            }, { status: 400 });
        }

        // Generate unique filename
        const timestamp = Date.now();
        const filename = `images/${timestamp}-${file.name}`;

        // Upload to Vercel Blob
        const blob = await put(filename, file, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN,
        });

        // Save metadata to database
        const imageRecord = await sql`
            INSERT INTO images (name, url, blob_url, size_bytes, file_type)
            VALUES (${file.name}, ${blob.url}, ${blob.url}, ${file.size}, ${file.type})
            RETURNING id::text, name, url, size_bytes as size, created_at as uploadDate
        `;

        const imageData = {
            id: imageRecord[0].id,
            name: imageRecord[0].name,
            url: imageRecord[0].url,
            size: imageRecord[0].size,
            uploadDate: imageRecord[0].uploaddate
        };

        return NextResponse.json(imageData);
    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await ensureDatabase();
        
        // Verify authentication
        if (!(await verifyAuth())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const imageUrl = searchParams.get('url');
        
        if (!imageUrl) {
            return NextResponse.json({ error: 'No image URL provided' }, { status: 400 });
        }

        // Get image record from database
        const imageRecord = await sql`
            SELECT id, blob_url FROM images WHERE url = ${imageUrl}
        `;

        if (imageRecord.length === 0) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        // Delete from Vercel Blob
        await del(imageRecord[0].blob_url, {
            token: process.env.BLOB_READ_WRITE_TOKEN,
        });

        // Delete from database
        await sql`
            DELETE FROM images WHERE url = ${imageUrl}
        `;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting image:', error);
        return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
    }
}
