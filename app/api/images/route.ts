import { NextResponse } from 'next/server'
import { getFilenamesFromManifest } from '@/lib/manifest-utils'

// This is a new change after v1.0
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId')
  const directory = searchParams.get('directory')

  if (!productId || !directory) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  try {
    const prefix = `blinds/${productId}/${directory}/`
    console.log('Looking for files with prefix:', prefix)
    
    const filenames = getFilenamesFromManifest(prefix)
    console.log('Found filenames:', filenames)
    
    // If no files found, return empty array instead of error
    if (!filenames || filenames.length === 0) {
      console.log('No files found for prefix:', prefix)
      return NextResponse.json([])
    }

    console.log('Returning filenames:', filenames)
    return NextResponse.json(filenames)
  } catch (error) {
    console.error('Error getting files from manifest:', error)
    // Return empty array instead of error for missing folders
    return NextResponse.json([])
  }
} 