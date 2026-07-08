import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import { AuthUtils } from '../../../../lib/auth';
import { sql } from '../../../../lib/database';

function isAdmin(request: NextRequest): boolean {
    const token = AuthUtils.getTokenFromRequest(request);
    if (!token) return false;
    const payload = AuthUtils.verifyToken(token);
    return payload?.role === 'admin';
}

export async function GET(request: NextRequest) {
    try {
        if (!isAdmin(request)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const images = await sql`
            SELECT
                id::text,
                name,
                url,
                size_bytes as size,
                created_at as upload_date
            FROM images
            ORDER BY created_at DESC
        `;

        const imageList = images.map(img => ({
            id: img.id,
            name: img.name,
            url: img.url,
            size: img.size,
            uploadDate: img.upload_date
        }));

        return NextResponse.json(imageList);
    } catch (error) {
        console.error('Error loading images:', error);
        return NextResponse.json({ error: 'Failed to load images' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        if (!isAdmin(request)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({
                error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'
            }, { status: 400 });
        }

        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            return NextResponse.json({
                error: 'File too large. Maximum size is 10MB.'
            }, { status: 400 });
        }

        const filename = `images/${Date.now()}-${file.name}`;

        const blob = await put(filename, file, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN,
        });

        const imageRecord = await sql`
            INSERT INTO images (name, url, blob_url, size_bytes, file_type)
            VALUES (${file.name}, ${blob.url}, ${blob.url}, ${file.size}, ${file.type})
            RETURNING id::text, name, url, size_bytes as size, created_at as upload_date
        `;

        return NextResponse.json({
            id: imageRecord[0].id,
            name: imageRecord[0].name,
            url: imageRecord[0].url,
            size: imageRecord[0].size,
            uploadDate: imageRecord[0].upload_date
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        if (!isAdmin(request)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const imageUrl = searchParams.get('url');

        if (!imageUrl) {
            return NextResponse.json({ error: 'No image URL provided' }, { status: 400 });
        }

        const imageRecord = await sql`
            SELECT id, blob_url FROM images WHERE url = ${imageUrl}
        `;

        if (imageRecord.length === 0) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        await del(imageRecord[0].blob_url, {
            token: process.env.BLOB_READ_WRITE_TOKEN,
        });

        await sql`
            DELETE FROM images WHERE url = ${imageUrl}
        `;

        // Clear the image from any prices that reference it, so they don't
        // keep pointing at a dead URL
        await sql`
            UPDATE prices SET image_url = NULL, updated_at = NOW()
            WHERE image_url = ${imageUrl}
        `;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting image:', error);
        return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
    }
}
