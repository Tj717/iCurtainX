import { NextResponse } from 'next/server';
import { listBlobs } from '@/lib/blob-storage';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mediaPath = searchParams.get('path');

  if (!mediaPath) {
    return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 });
  }

  try {
    const prefix = `${mediaPath}/`;
    const blobs = await listBlobs(prefix);
    
    // Extract filenames from blob URLs
    const files = blobs.map(blob => {
      const url = new URL(blob.url);
      return url.pathname.split('/').pop() || '';
    });

    console.log('Found files:', files);
    return NextResponse.json(files);
  } catch (error) {
    console.error('Error listing blobs:', error);
    return NextResponse.json({ error: 'Failed to list media files' }, { status: 500 });
  }
} 