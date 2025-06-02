'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

type Props = {
  slug: string;
  operation?: string;
};

export default function Colors({ slug, operation }: Props) {
  const [colorFiles, setColorFiles] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const path = operation 
      ? `blinds/${slug}/${operation}/color`
      : `blinds/${slug}/color`;
    
    fetch(`/api/media?path=${path}`)
      .then(async res => {
        if (!res.ok) {
          // If the response is not ok (404, 500, etc.), return empty array
          console.log('Directory not found or error:', path);
          return [];
        }
        const data = await res.json();
        return Array.isArray(data) ? data : [];
      })
      .then(files => {
        const imageFiles = files.filter((file: string) => 
          decodeURIComponent(file).match(/\.(jpg|jpeg|png)$/i)
        );
        setColorFiles(imageFiles);
      })
      .catch(error => {
        console.error('Error fetching color files:', error);
        setColorFiles([]);
      });
  }, [slug, operation]);

  if (colorFiles.length === 0) {
    return null;
  }

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseOverlay = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="mt-8 p-4 sm:p-6 rounded-lg border border-gray-200 bg-blue-100">
        <h2 className="text-xl font-semibold mb-4 sm:mb-6">Colors</h2>
        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
          {colorFiles.map((file, index) => (
            <div
              key={index}
              className="w-[100px] h-[130px] cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:border-blue-500 transition-colors relative bg-white"
              onClick={() => handleImageClick(file)}
            >
              <div className="absolute top-1 right-1 z-10 bg-white/80 text-gray-600 text-xs font-medium px-1.5 py-0.5 rounded">
                {index + 1}
              </div>
              <div className="relative w-full h-full">
                <Image
                  src={`/blinds/${slug}${operation ? `/${operation}` : ''}/color/${file}`}
                  alt={`Color option ${index + 1}`}
                  fill
                  sizes="100px"
                  className="object-contain p-1"
                />
              </div>
            </div>
          ))}
        </div>
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
              src={`/blinds/${slug}${operation ? `/${operation}` : ''}/color/${selectedImage}`}
              alt="Selected color"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
} 