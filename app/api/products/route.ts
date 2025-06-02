import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const blindsPath = path.join(process.cwd(), 'public', 'blinds')
    
    // Check if directory exists
    if (!fs.existsSync(blindsPath)) {
      return NextResponse.json({ error: 'Blinds directory not found' }, { status: 404 })
    }

    // Read directory contents
    const directories = fs.readdirSync(blindsPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => ({
        id: dirent.name,
        name: dirent.name.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
      }))

    return NextResponse.json(directories)
  } catch (error) {
    console.error('Error reading products directory:', error)
    return NextResponse.json({ error: 'Failed to read products directory' }, { status: 500 })
  }
} 