import { NextResponse } from 'next/server';
import { getFilenamesFromManifest } from '@/lib/manifest-utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mediaPath = searchParams.get('path');

  if (!mediaPath) {
    return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 });
  }

  try {
    const prefix = `${mediaPath}/`;
    const filenames = getFilenamesFromManifest(prefix);
    
    console.log('Found files:', filenames);
    return NextResponse.json(filenames);
  } catch (error) {
    console.error('Error listing media files:', error);
    return NextResponse.json({ error: 'Failed to list media files' }, { status: 500 });
  }
} 