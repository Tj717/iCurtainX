import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mediaPath = searchParams.get('path');

  if (!mediaPath) {
    return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 });
  }

  try {
    const fullPath = path.join(process.cwd(), 'public', mediaPath);
    console.log('Reading directory:', fullPath);
    
    if (!fs.existsSync(fullPath)) {
      console.error('Directory does not exist:', fullPath);
      return NextResponse.json({ error: 'Directory not found' }, { status: 404 });
    }

    const files = fs.readdirSync(fullPath);
    console.log('Found files:', files);
    
    // Encode spaces in filenames for URL safety
    const encodedFiles = files.map(file => encodeURIComponent(file));
    return NextResponse.json(encodedFiles);
  } catch (error) {
    console.error('Error reading media directory:', error);
    return NextResponse.json({ error: 'Failed to read media directory' }, { status: 500 });
  }
} 