import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId')
  const directory = searchParams.get('directory')

  if (!productId || !directory) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  try {
    const dirPath = path.join(process.cwd(), 'public', 'blinds', productId, directory)
    
    // Check if directory exists
    if (!fs.existsSync(dirPath)) {
      return NextResponse.json({ error: 'Directory not found' }, { status: 404 })
    }

    // Read directory contents
    const files = fs.readdirSync(dirPath)
    
    // Filter for image files only
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)
    })

    return NextResponse.json(imageFiles)
  } catch (error) {
    console.error('Error reading directory:', error)
    return NextResponse.json({ error: 'Failed to read directory' }, { status: 500 })
  }
} 