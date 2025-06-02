import { NextResponse } from 'next/server'
import { listBlobs } from '@/lib/blob-storage'

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
    console.log('Listing blobs with prefix:', prefix)
    const blobs = await listBlobs(prefix)
    console.log('Received blobs:', blobs)
    
    // If no blobs found, return empty array instead of error
    if (!blobs || blobs.length === 0) {
      console.log('No blobs found for prefix:', prefix)
      return NextResponse.json([])
    }
    
    // Extract just the filenames from the blob URLs
    const imageFiles = blobs.map(blob => {
      const url = new URL(blob.url)
      const filename = url.pathname.split('/').pop()
      console.log('Extracted filename:', filename)
      return filename
    })

    console.log('Returning image files:', imageFiles)
    return NextResponse.json(imageFiles)
  } catch (error) {
    console.error('Error listing blobs:', error)
    // Return empty array instead of error for missing folders
    return NextResponse.json([])
  }
} 