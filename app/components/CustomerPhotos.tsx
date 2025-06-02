'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  photos: string[];
  limit?: number;
  onLoadMore?: () => void;
  hasMore?: boolean;
  singleRow?: boolean;
};

export default function CustomerPhotos({ photos, limit = 5, onLoadMore, hasMore = false, singleRow = false }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const displayedPhotos = photos.slice(0, limit);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseOverlay = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className={`grid grid-cols-3 ${singleRow ? 'md:flex md:flex-nowrap md:gap-2' : 'md:grid-cols-4 lg:grid-cols-5 gap-2'} w-full`}>
        {displayedPhotos.map((photo, index) => (
          <div
            key={index}
            className={`bg-white shadow-md overflow-hidden border-2 border-transparent hover:border-blue-500 transition-colors cursor-pointer ${singleRow ? 'md:flex-1' : 'w-full'} aspect-square`}
            onClick={() => handleImageClick(photo)}
          >
            <div className="relative w-full h-full">
              <Image
                src={`/blinds/picture-demo/all/${photo}`}
                alt={`Customer photo ${index + 1}`}
                fill
                className="object-cover"
                sizes={singleRow ? "(max-width: 768px) 30vw, 20vw" : "(max-width: 768px) 30vw, (max-width: 1024px) 25vw, 20vw"}
              />
            </div>
          </div>
        ))}
      </div>

      {hasMore && onLoadMore && (
        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            className="border-blue-700 text-blue-700 hover:bg-blue-50"
            onClick={onLoadMore}
          >
            Load More
          </Button>
        </div>
      )}

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
              src={`/blinds/picture-demo/all/${selectedImage}`}
              alt="Selected photo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
} 