'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type Props = {
  slug: string;
  operation: string;
};

type MediaFile = {
  name: string;
  type: 'image' | 'video';
  url: string;
};

export default function MediaGallery({ slug, operation }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch media files from intro folder
    const introPath = `blinds/${slug}/${operation}/intro`;
    console.log('Fetching media files from:', introPath);

    setIsLoading(true);
    setError(null);
    fetch(`/api/images?productId=${slug}&directory=${operation}/intro`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log('API response:', data);
        return data;
      })
      .then(files => {
        console.log('Received files:', files);
        if (!Array.isArray(files)) {
          throw new Error('Invalid response format');
        }
        const mediaFiles = files
          .filter((file: string) => {
            const decodedFile = decodeURIComponent(file);
            const isValid = decodedFile.match(/\.(jpg|jpeg|png|mp4|webm)$/i);
            console.log('File:', decodedFile, 'isValid:', isValid);
            return isValid;
          })
          .map((file: string) => {
            const decodedFile = decodeURIComponent(file);
            const url = `https://fhasj7d8bol4e7bf.public.blob.vercel-storage.com/blinds/${slug}/${operation}/intro/${decodedFile}`;
            console.log('Created URL:', url);
            return {
              name: decodedFile,
              type: decodedFile.match(/\.(mp4|webm)$/i) ? 'video' : 'image',
              url
            };
          });
        console.log('Processed media files:', mediaFiles);
        setMediaFiles(mediaFiles);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching media files:', error);
        setError(error.message);
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

  if (error) {
    return (
      <div className="w-full h-[50vh] md:max-w-[500px] md:h-[500px] border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 mx-auto">
        <span className="text-red-500">Error: {error}</span>
      </div>
    );
  }

  if (mediaFiles.length === 0) {
    return (
      <div className="w-full h-[50vh] md:max-w-[500px] md:h-[500px] border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 mx-auto">
        <div className="text-center">
          <span className="text-gray-400 block mb-2">No media available</span>
          <span className="text-sm text-gray-500">This folder has not been migrated to the new storage yet.</span>
        </div>
      </div>
    );
  }

  const currentMedia = mediaFiles[currentIndex];
  console.log('Current media:', currentMedia);

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
                src={currentMedia.url}
                alt={`Product image ${currentIndex + 1}`}
                fill
                className="object-contain p-2"
                priority
                onError={(e) => {
                  console.error('Image failed to load:', currentMedia.url);
                  setError('Failed to load image');
                }}
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center p-2">
              <video
                src={currentMedia.url}
                controls
                className="w-full h-full object-contain"
                onError={(e) => {
                  console.error('Video failed to load:', currentMedia.url);
                  setError('Failed to load video');
                }}
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
              src={currentMedia.url}
              alt={`Product image ${currentIndex + 1}`}
              fill
              className="object-contain"
              onError={(e) => {
                console.error('Full-screen image failed to load:', currentMedia.url);
                setError('Failed to load image');
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}