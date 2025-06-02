import { products } from '@/data/metadata';
import { notFound } from 'next/navigation';
import MediaGallery from './MediaGallery';
import Colors from '@/app/components/Colors';

type Props = {
  params: {
    slug: string;
    operation: string;
  };
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug, operation } = await Promise.resolve(params);
  const operationTypes = products[slug as keyof typeof products];

  // If product doesn't exist in metadata, show 404
  if (!(slug in products)) {
    notFound();
  }

  // If operation type is not valid for this product, show 404
  if (!operationTypes || !operationTypes.includes(operation)) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{slug.charAt(0).toUpperCase() + slug.slice(1)} Blind</h1>
      
      {/* Mobile Layout */}
      <div className="flex flex-col items-center lg:hidden">
        <div className="w-[90vw] max-w-[500px]">
          <MediaGallery slug={slug} operation={operation} />
        </div>
        <div className="w-[90vw] max-w-[500px] mt-[5vw]">
          <Colors slug={slug} operation={operation} />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-8">
        <div className="max-w-[500px]">
          <MediaGallery slug={slug} operation={operation} />
        </div>
        <div>
          <Colors slug={slug} operation={operation} />
        </div>
      </div>
    </div>
  );
} 