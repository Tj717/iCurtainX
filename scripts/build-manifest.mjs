// build-manifest.mjs
import { list } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

// === CONFIGURATION (Set your values here) ===
const BLOB_TOKEN = 'old token'; // <-- replace with your actual token
const BLOB_PREFIX = 'blinds/'; // Folder in your blob storage
const OUTPUT_PATH = './data/manifest.json'; // Output location
// ============================================

// Set token in env (required by SDK)
process.env.BLOB_READ_WRITE_TOKEN = BLOB_TOKEN;

async function generateManifest() {
  const allBlobs = [];
  let cursor;

  do {
    const { blobs, cursor: nextCursor } = await list({ prefix: BLOB_PREFIX, cursor });
    allBlobs.push(...blobs);
    cursor = nextCursor;
  } while (cursor);

  const urls = allBlobs
    .filter(blob => blob.url && blob.pathname)
    .map(blob => blob.url);

  // Ensure directory exists
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });

  // Write to file
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(urls, null, 2));
  console.log(`✅ Manifest saved to ${OUTPUT_PATH} with ${urls.length} items.`);
}

generateManifest().catch(err => {
  console.error('❌ Failed to generate manifest:', err);
  process.exit(1);
});
