import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const BLINDS_DIR = path.join(PUBLIC_DIR, 'blinds');

// Check for required environment variable
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('Error: BLOB_READ_WRITE_TOKEN environment variable is required');
  process.exit(1);
}

async function uploadFile(filePath: string, blobPath: string) {
  try {
    const fileContent = await readFile(filePath);
    const blob = await put(blobPath, fileContent, {
      access: 'public',
      allowOverwrite: true,
    });
    console.log(`Uploaded: ${blobPath}`);
    return blob;
  } catch (error) {
    console.error(`Error uploading ${blobPath}:`, error);
    throw error;
  }
}

async function processDirectory(dirPath: string, basePath: string) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(PUBLIC_DIR, fullPath);
    const blobPath = relativePath.replace(/\\/g, '/');

    if (entry.isDirectory()) {
      await processDirectory(fullPath, basePath);
    } else if (entry.isFile()) {
      // Skip non-image/video files
      if (!entry.name.match(/\.(jpg|jpeg|png|gif|webp|mp4|webm)$/i)) {
        continue;
      }
      await uploadFile(fullPath, blobPath);
    }
  }
}

async function migrateToBlob() {
  try {
    console.log('Starting migration to blob storage...');
    await processDirectory(BLINDS_DIR, 'blinds');
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateToBlob(); 