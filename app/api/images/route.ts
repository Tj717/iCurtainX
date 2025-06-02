import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Utility function to check if file is an image
const isImageFile = (filename: string) => {
  const ext = path.extname(filename).toLowerCase()
  return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId')
  const directory = searchParams.get('directory')

  if (!productId || !directory) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  try {
    const dirPath = path.join(process.cwd(), 'public', 'blinds', productId, directory)
    
    // Use async/await with promises
    const files = await fs.readdir(dirPath)
    const imageFiles = files.filter(isImageFile)

    return NextResponse.json(imageFiles)
  } catch (error) {
    console.error('Error reading directory:', error)
    return NextResponse.json({ error: 'Failed to read directory' }, { status: 500 })
  }
} 