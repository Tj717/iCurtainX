import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const productId = formData.get('productId') as string
    const directory = formData.get('directory') as string

    if (!file || !productId || !directory) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create the blob path
    const blobPath = `blinds/${productId}/${directory}/${file.name}`
    
    // Upload to Vercel Blob
    const blob = await put(blobPath, file, {
      access: 'public',
    })

    return NextResponse.json({
      url: blob.url,
      success: true
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}

// Helper function to migrate existing images
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')
    const directory = searchParams.get('directory')

    if (!productId || !directory) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const dirPath = path.join(process.cwd(), 'public', 'blinds', productId, directory)
    const files = await fs.readdir(dirPath)
    
    const results = []
    for (const file of files) {
      if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(path.extname(file).toLowerCase())) {
        const filePath = path.join(dirPath, file)
        const fileBuffer = await fs.readFile(filePath)
        const blobPath = `blinds/${productId}/${directory}/${file}`
        
        const blob = await put(blobPath, fileBuffer, {
          access: 'public',
        })
        
        results.push({
          originalFile: file,
          blobUrl: blob.url
        })
      }
    }

    return NextResponse.json({
      success: true,
      migrated: results
    })
  } catch (error) {
    console.error('Error migrating files:', error)
    return NextResponse.json(
      { error: 'Failed to migrate files' },
      { status: 500 }
    )
  }
} 