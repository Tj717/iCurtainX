import manifest from '@/data/manifest.json';

export interface ManifestImage {
  url: string;
  filename: string;
  path: string;
}

/**
 * Get all images from manifest that match a specific path pattern
 */
export function getImagesFromManifest(pathPattern: string): ManifestImage[] {
  const baseUrl = 'https://fhasj7d8bol4e7bf.public.blob.vercel-storage.com/';
  
  return manifest
    .filter((url: string) => {
      // Remove the base URL to get the relative path
      const relativePath = url.replace(baseUrl, '');
      return relativePath.startsWith(pathPattern);
    })
    .map((url: string) => {
      const relativePath = url.replace(baseUrl, '');
      const filename = relativePath.split('/').pop() || '';
      return {
        url,
        filename,
        path: relativePath
      };
    });
}

/**
 * Get filenames from manifest that match a specific path pattern
 */
export function getFilenamesFromManifest(pathPattern: string): string[] {
  return getImagesFromManifest(pathPattern).map(img => img.filename);
}

/**
 * Check if a specific file exists in the manifest
 */
export function fileExistsInManifest(filePath: string): boolean {
  const baseUrl = 'https://fhasj7d8bol4e7bf.public.blob.vercel-storage.com/';
  const fullUrl = baseUrl + filePath;
  return manifest.includes(fullUrl);
}

/**
 * Get the full URL for a specific file path
 */
export function getFileUrl(filePath: string): string | null {
  const baseUrl = 'https://fhasj7d8bol4e7bf.public.blob.vercel-storage.com/';
  const fullUrl = baseUrl + filePath;
  return manifest.includes(fullUrl) ? fullUrl : null;
} 