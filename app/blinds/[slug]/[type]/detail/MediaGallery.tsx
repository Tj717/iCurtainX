'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type MediaFile = {
  type: 'image' | 'video';
  src: string;
};

type MediaGalleryProps = {
  slug: string;
  type: string;
  mediaFiles: MediaFile[];
};

export function MediaGallery({ mediaFiles }: MediaGalleryProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentMediaIndex((prev) => (prev === 0 ? mediaFiles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentMediaIndex((prev) => (prev === mediaFiles.length - 1 ? 0 : prev + 1));
  };

  if (!mediaFiles || mediaFiles.length === 0) {
    return (
      <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">No media files found</p>
      </div>
    );
  }

  const currentMedia = mediaFiles[currentMediaIndex];

  return (
    <div className="relative w-full">
      <div className="relative w-full overflow-hidden">
        {currentMedia.type === 'image' ? (
          <Image
            src={currentMedia.src}
            alt="Product media"
            width={600}
            height={450}
            className="w-full h-auto object-contain p-2"
            priority
          />
        ) : (
          <div className="w-full p-2">
            <video
              src={currentMedia.src}
              controls
              className="w-full h-auto object-contain"
            />
          </div>
        )}
      </div>

      {/* Navigation Arrows */}
      {mediaFiles.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}
    </div>
  );
} 