const MAX_DIMENSION = 1200;
const QUALITY = 0.8;

// Shrink and re-encode an image in the browser before upload, so large
// phone photos never hit the server's 10MB limit. Falls back to the
// original file if anything fails.
export async function compressImage(file: File): Promise<File> {
    if (!file.type.startsWith('image/') || file.type === 'image/gif') {
        return file;
    }

    try {
        const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
        const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
        const width = Math.round(bitmap.width * scale);
        const height = Math.round(bitmap.height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return file;
        ctx.drawImage(bitmap, 0, 0, width, height);
        bitmap.close();

        const blob = await new Promise<Blob | null>(resolve =>
            canvas.toBlob(resolve, 'image/webp', QUALITY)
        );

        if (!blob || blob.size >= file.size) {
            return file;
        }

        const name = file.name.replace(/\.[^.]+$/, '') + '.webp';
        return new File([blob], name, { type: 'image/webp' });
    } catch (error) {
        console.error('Image compression failed, uploading original:', error);
        return file;
    }
}
