'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

type Props = {
  slug: string;
  operation?: string;
};

export default function LongImage({ slug, operation }: Props) {
  const [hasLongImage, setHasLongImage] = useState(false);

  useEffect(() => {
    const path = operation 
      ? `blinds/${slug}/${operation}`
      : `blinds/${slug}`;
    
    fetch(`/api/images?productId=${slug}&directory=${operation || ''}`)
      .then(async res => {
        if (!res.ok) {
          return [];
        }
        const data = await res.json();
        return Array.isArray(data) ? data : [];
      })
      .then(files => {
        const hasLong = files.some((file: string) => 
          decodeURIComponent(file).toLowerCase() === 'long.jpg'
        );
        setHasLongImage(hasLong);
      })
      .catch(error => {
        console.error('Error checking for long image:', error);
        setHasLongImage(false);
      });
  }, [slug, operation]);

  return (
    <div className="w-full flex flex-col items-center gap-8 mt-8">
      {hasLongImage && (
        <div className="w-full max-w-[800px]">
          <Image
            src={`https://fhasj7d8bol4e7bf.public.blob.vercel-storage.com/blinds/${slug}${operation ? `/${operation}` : ''}/long.jpg`}
            alt="Product long view"
            width={600}
            height={0}
            className="w-full h-auto"
            priority
          />
        </div>
      )}
      <div className="w-full max-w-[800px]">
        <Image
          src="/blinds/shipment_detail.png"
          alt="Shipment details"
          width={600}
          height={0}
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
  );
} 