'use client';

import { useEffect, useState } from 'react';
import CustomerPhotos from '../components/CustomerPhotos';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function CustomerPhotosPage() {
  const [allPhotos, setAllPhotos] = useState<string[]>([]);
  const [displayedPhotos, setDisplayedPhotos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLimit, setCurrentLimit] = useState(12);

  useEffect(() => {
    fetch('/api/media?path=blinds/picture-demo/all')
      .then(res => res.json())
      .then(files => {
        const imageFiles = files.filter((file: string) => 
          decodeURIComponent(file).match(/\.(jpg|jpeg|png|webp)$/i)
        );
        setAllPhotos(imageFiles);
        setDisplayedPhotos(imageFiles.slice(0, currentLimit));
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching photos:', error);
        setIsLoading(false);
      });
  }, []);

  const handleLoadMore = () => {
    const newLimit = currentLimit + 12;
    setCurrentLimit(newLimit);
    setDisplayedPhotos(allPhotos.slice(0, newLimit));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="flex items-center hover:text-blue-600">
          <Home size={16} className="mr-1" />
          Home
        </Link>
        <ChevronRight size={16} />
        <span className="text-gray-900">Customer Photos</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Customer Photos</h1>
      <CustomerPhotos 
        photos={displayedPhotos} 
        limit={currentLimit}
        onLoadMore={handleLoadMore}
        hasMore={currentLimit < allPhotos.length}
      />
    </div>
  );
} 