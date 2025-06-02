'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

type Props = {
  slug: string;
};

export default function MediaGallery({ slug }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<Array<{ name: string; type: 'image' | 'video' }>>([]);

  useEffect(() => {
    // Fetch media files from the server
    const path = `blinds/${slug}/intro`;
    console.log('Fetching media files from:', path);
    
    fetch(`/api/media?path=${path}`)
      .then(res => res.json())
      .then(files => {
        console.log('Received files:', files);
        const mediaFiles = files
          .filter((file: string) => decodeURIComponent(file).match(/\.(jpg|jpeg|png|mp4|webm)$/i))
          .map((file: string) => ({
            name: decodeURIComponent(file),
            type: decodeURIComponent(file).match(/\.(mp4|webm)$/i) ? 'video' : 'image'
          }));
        console.log('Filtered media files:', mediaFiles);
        setMediaFiles(mediaFiles);
      })
      .catch(error => {
        console.error('Error fetching media files:', error);
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
            src={`/blinds/${slug}/intro/${currentMedia.name}`}
            alt={`Product image ${currentIndex + 1}`}
            fill
            className="object-contain p-2"
            priority
          />
        ) : (
          <div className="w-full h-full p-2">
            <video
              src={`/blinds/${slug}/intro/${currentMedia.name}`}
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
        className={`absolute top-2 right-2 p-2 rounded-full hover:bg-black/10 transition-colors ${isFullscreen ? 'text-white' : 'text-gray-600'}`}
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
      </button>

      {/* Pagination Dots */}
      {mediaFiles.length > 1 && (
        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 ${isFullscreen ? 'text-white' : 'text-gray-600'}`}>
          {mediaFiles.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-current' : 'bg-current/30'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}