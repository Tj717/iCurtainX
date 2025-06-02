'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type ProductCardProps = {
  name: string;
  operationTypes?: string[];
  slug: string;
  isOperationType?: boolean;
  thumbnail: string;
};

export default function ProductCard({ name, operationTypes, slug, isOperationType = false, thumbnail }: ProductCardProps) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Construct the blob URL based on the thumbnail path
    const url = `https://fhasj7d8bol4e7bf.public.blob.vercel-storage.com/${thumbnail.replace(/^\//, '')}`;
    setThumbnailUrl(url);
  }, [thumbnail]);

  const handleImageError = () => {
    setImageError(true);
    setThumbnailUrl(null);
  };

  const renderImage = () => {
    if (imageError || !thumbnailUrl) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <span className="text-gray-400">No image available</span>
        </div>
      );
    }

    return (
      <Image
        src={thumbnailUrl}
        alt={name}
        fill
        className="object-cover"
        onError={handleImageError}
      />
    );
  };

  // If it's an operation type card (from Types page), link to the product detail page
  if (isOperationType && operationTypes && operationTypes.length > 0) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-[400px] border-2 border-gray-300 hover:border-blue-500 transition-colors">
        <Link href={`/blinds/${slug}/${operationTypes[0]}/detail`}>
          <div className="relative h-[300px] w-full border-b-2 border-gray-300">
            {renderImage()}
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
          </div>
        </Link>
      </div>
    );
  }

  // If it's an operation type card (from BlindOperationTypesPage), link to the product detail page
  if (isOperationType) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-[400px] border-2 border-gray-300 hover:border-blue-500 transition-colors">
        <Link href={`/blinds/${slug}/${name.toLowerCase()}/detail`}>
          <div className="relative h-[300px] w-full border-b-2 border-gray-300">
            {renderImage()}
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
          </div>
        </Link>
      </div>
    );
  }

  // For main product cards (from Blinds page), link to the operation types page
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-[400px]">
      <Link href={`/blinds/${slug}`}>
        <div className="relative h-[300px] w-full border-b-2 border-gray-300">
          {renderImage()}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
          {operationTypes && operationTypes.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {operationTypes.map((type) => (
                <span
                  key={type}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {type}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
} 