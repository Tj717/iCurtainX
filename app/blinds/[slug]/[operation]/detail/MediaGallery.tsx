'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type Props = {
  slug: string;
  operation: string;
};

export default function MediaGallery({ slug, operation }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaFiles, setMediaFiles] = useState<Array<{ name: string; type: 'image' | 'video' }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Fetch media files from intro folder
    const introPath = `blinds/${slug}/${operation}/intro`;
    console.log('Fetching media files from:', introPath);

    setIsLoading(true);
    fetch(`/api/media?path=${introPath}`)
      .then(res => res.json())
      .then(files => {
        console.log('Received files:', files);
        const mediaFiles = files
          .filter((file: string) => {
            const decodedFile = decodeURIComponent(file);
            return decodedFile.match(/\.(jpg|jpeg|png|mp4|webm)$/i);
          })
          .map((file: string) => {
            const decodedFile = decodeURIComponent(file);
            return {
              name: decodedFile,
              type: decodedFile.match(/\.(mp4|webm)$/i) ? 'video' : 'image'
            };
          });
        console.log('Processed media files:', mediaFiles);
        setMediaFiles(mediaFiles);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching media files:', error);
        setIsLoading(false);
      });
  }, [slug, operation]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? mediaFiles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === mediaFiles.length - 1 ? 0 : prev + 1));
  };

  const handleCloseExpanded = () => {
    setIsExpanded(false);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isExpanded]);

  if (isLoading) {
    return (
      <div className="w-full h-[50vh] md:max-w-[500px] md:h-[500px] border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 mx-auto">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (mediaFiles.length === 0) {
    return null;
  }

  const currentMedia = mediaFiles[currentIndex];

  return (
    <>
      <div 
        className="relative w-full h-[50vh] md:max-w-[500px] md:h-[500px] border-2 border-gray-300 rounded-lg cursor-pointer overflow-hidden"
        onClick={() => currentMedia.type === 'image' && setIsExpanded(true)}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {currentMedia.type === 'image' ? (
            <div className="relative w-full h-full">
              <Image
                src={`/blinds/${slug}/${operation}/intro/${encodeURIComponent(currentMedia.name)}`}
                alt={`Product image ${currentIndex + 1}`}
                fill
                className="object-contain p-2"
                priority
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center p-2">
              <video
                src={`/blinds/${slug}/${operation}/intro/${encodeURIComponent(currentMedia.name)}`}
                controls
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        {mediaFiles.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute top-[50%] -translate-y-1/2 left-[5%] p-2 rounded-full hover:bg-black/10 transition-colors text-gray-600"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute top-[50%] -translate-y-1/2 right-[5%] p-2 rounded-full hover:bg-black/10 transition-colors text-gray-600"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Pagination Dots */}
        {mediaFiles.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {mediaFiles.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-blue-300'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Full-screen overlay */}
      {isExpanded && currentMedia.type === 'image' && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={handleCloseExpanded}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={handleCloseExpanded}
          >
            <X size={24} />
          </button>
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] p-4">
            <Image
              src={`/blinds/${slug}/${operation}/intro/${encodeURIComponent(currentMedia.name)}`}
              alt={`Product image ${currentIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
} 