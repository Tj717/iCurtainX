// app/components/TextDescription.tsx

import React from 'react';
import { productDescriptions } from '@/data/metadata';

type TextDescriptionProps = {
  slug: string;
  operation?: string;
};

export default function TextDescription({ slug, operation }: TextDescriptionProps) {
  // Determine lookup key: either "slug/operation" or just "slug"
  const key = operation ? `${slug}/${operation}` : slug;
  const text = productDescriptions[key as keyof typeof productDescriptions] || '';
  if (!text) return null;

  return (
    <div className="mb-6" style={{ whiteSpace: 'pre-line' }}>
      {text}
    </div>
  );
}
