import { put, del } from '@vercel/blob';

export async function uploadToBlob(file: File, pathname: string) {
  try {
    const blob = await put(pathname, file, {
      access: 'public',
    });
    return blob;
  } catch (error) {
    console.error('Error uploading to blob:', error);
    throw error;
  }
}

export async function deleteFromBlob(url: string) {
  try {
    await del(url);
  } catch (error) {
    console.error('Error deleting from blob:', error);
    throw error;
  }
} 