import { NextResponse } from 'next/server'
import { listBlobs } from '@/lib/blob-storage'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId')
  const directory = searchParams.get('directory')

  if (!productId || !directory) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  try {
    const prefix = `blinds/${productId}/${directory}/`
    const blobs = await listBlobs(prefix)
    
    // Extract just the filenames from the blob URLs
    const imageFiles = blobs.map(blob => {
      const url = new URL(blob.url)
      return url.pathname.split('/').pop()
    })

    return NextResponse.json(imageFiles)
  } catch (error) {
    console.error('Error listing blobs:', error)
    return NextResponse.json({ error: 'Failed to list images' }, { status: 500 })
  }
} 