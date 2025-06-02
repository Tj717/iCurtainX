'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  slug: string;
};

type MediaFile = {
  name: string;
  type: 'image' | 'video';
  url: string;
};

export default function MediaGallery({ slug }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch media files from the server
    console.log('Fetching media files for:', slug);
    
    setIsLoading(true);
    setError(null);
    fetch(`/api/images?productId=${slug}&directory=intro`)
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
            const url = `https://fhasj7d8bol4e7bf.public.blob.vercel-storage.com/blinds/${slug}/intro/${decodedFile}`;
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
  }, [slug]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? mediaFiles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === mediaFiles.length - 1 ? 0 : prev + 1));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isFullscreen]);

  if (isLoading) {
    return (
      <div className="w-[85vw] h-[50vh] md:w-[500px] md:h-[500px] border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading media...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[85vw] h-[50vh] md:w-[500px] md:h-[500px] border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-100">
        <p className="text-red-500">Error loading media: {error}</p>
      </div>
    );
  }

  if (mediaFiles.length === 0) {
    return (
      <div className="w-[85vw] h-[50vh] md:w-[500px] md:h-[500px] border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">No media files found</p>
      </div>
    );
  }

  const currentMedia = mediaFiles[currentIndex];

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'w-[85vw] h-[50vh] md:w-[500px] md:h-[500px] border-2 border-gray-300 rounded-lg overflow-hidden'}`}>
      <div className="relative w-full h-full">
        {currentMedia.type === 'image' ? (
          <Image
            src={currentMedia.url}
            alt={`Product image ${currentIndex + 1}`}
            fill
            className="object-contain p-2"
            priority
          />
        ) : (
          <div className="w-full h-full p-2">
            <video
              src={currentMedia.url}
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
            onClick={handlePrevious}
            className={`absolute top-[50%] -translate-y-1/2 left-[5%] p-2 rounded-full hover:bg-black/10 transition-colors ${isFullscreen ? 'text-white' : 'text-gray-600'}`}
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className={`absolute top-[50%] -translate-y-1/2 right-[5%] p-2 rounded-full hover:bg-black/10 transition-colors ${isFullscreen ? 'text-white' : 'text-gray-600'}`}
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Fullscreen Toggle */}
      <button
        onClick={toggleFullscreen}
        className={`absolute bottom-4 right-4 p-2 rounded-full hover:bg-black/10 transition-colors ${isFullscreen ? 'text-white' : 'text-gray-600'}`}
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullscreen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        )}
      </button>
    </div>
  );
}