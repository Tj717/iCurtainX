require('dotenv').config({ path: '.env.local' });
const fs = require('fs').promises;
const path = require('path');
const { put } = require('@vercel/blob');

async function migrateImages() {
  try {
    const blindsDir = path.join(process.cwd(), 'public', 'blinds');
    const productDirs = await fs.readdir(blindsDir);

    console.log('Found product directories:', productDirs);

    for (const productId of productDirs) {
      const productPath = path.join(blindsDir, productId);
      const stat = await fs.stat(productPath);

      if (stat.isDirectory()) {
        const subDirs = await fs.readdir(productPath);
        console.log(`\nProcessing product ${productId}:`);

        for (const directory of subDirs) {
          const dirPath = path.join(productPath, directory);
          const dirStat = await fs.stat(dirPath);

          if (dirStat.isDirectory()) {
            console.log(`\nMigrating ${productId}/${directory}:`);
            const files = await fs.readdir(dirPath);

            for (const file of files) {
              if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(path.extname(file).toLowerCase())) {
                const filePath = path.join(dirPath, file);
                const fileBuffer = await fs.readFile(filePath);
                const blobPath = `blinds/${productId}/${directory}/${file}`;

                console.log(`Uploading ${file}...`);
                try {
                  const blob = await put(blobPath, fileBuffer, {
                    access: 'public',
                  });
                  console.log(`✓ Uploaded to ${blob.url}`);
                } catch (error) {
                  console.error(`Failed to upload ${file}:`, error);
                }
              }
            }
          }
        }
      }
    }

    console.log('\nMigration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

migrateImages(); 