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
    
    fetch(`/api/media?path=${path}`)
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

  if (!hasLongImage) {
    return null;
  }

  const imagePath = operation 
    ? `/blinds/${slug}/${operation}/long.jpg`
    : `/blinds/${slug}/long.jpg`;

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-full max-w-[800px]">
        <Image
          src={imagePath}
          alt="Product long view"
          width={600}
          height={0}
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
  );
} 