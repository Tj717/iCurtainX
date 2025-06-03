"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

type Props = {
  slug: string;
  operation?: string;
};

type ColorFile = {
  name: string;
  url: string;
};

export default function Colors({ slug, operation }: Props) {
  const [colorFiles, setColorFiles] = useState<ColorFile[]>([]);
  const [selectedImage, setSelectedImage] = useState<ColorFile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const path = operation 
      ? `blinds/${slug}/${operation}/color`
      : `blinds/${slug}/color`;
    
    setIsLoading(true);
    setError(null);

    fetch(`/api/images?productId=${slug}&directory=${operation ? `${operation}/color` : 'color'}`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
      })
      .then(files => {
        if (!Array.isArray(files)) {
          throw new Error('Invalid response format');
        }
        const imageFiles = files
          .filter((file: string) => {
            const decodedFile = decodeURIComponent(file);
            return decodedFile.match(/\.(jpg|jpeg|png)$/i);
          })
          .map(file => {
            const decodedFile = decodeURIComponent(file);
            return {
              name: file,
              url: `https://fhasj7d8bol4e7bf.public.blob.vercel-storage.com/blinds/${slug}${
                operation ? `/${operation}` : ''
              }/color/${decodedFile}`
            };
          });
        setColorFiles(imageFiles);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching color files:', err);
        setError(err.message);
        setColorFiles([]);
        setIsLoading(false);
      });
  }, [slug, operation]);

  if (isLoading) {
    return (
      <div className="w-full h-[200px] border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[200px] border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
        <span className="text-red-500">Error: {error}</span>
      </div>
    );
  }

  // If there are no color files, don't render anything
  if (colorFiles.length === 0) {
    return null;
  }

  const handleImageClick = (image: ColorFile) => {
    setSelectedImage(image);
  };

  const handleCloseOverlay = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 mt-6">Available Colors</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {colorFiles.map((file, index) => (
          <div
            key={index}
            className="relative aspect-square border-2 border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-blue-500 transition-colors"
            onClick={() => handleImageClick(file)}
          >
            <Image
              src={file.url}
              alt={`Color option ${index + 1}`}
              fill
              className="object-cover"
              onError={() => {
                console.error('Image failed to load:', file.url);
                setError('Failed to load image');
              }}
            />
          </div>
        ))}
      </div>

      {/* Full-screen overlay */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={handleCloseOverlay}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={handleCloseOverlay}
          >
            <X size={24} />
          </button>
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] p-4">
            <Image
              src={selectedImage.url}
              alt="Selected color"
              fill
              className="object-contain"
              onError={() => {
                console.error('Full-screen image failed to load:', selectedImage.url);
                setError('Failed to load image');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
