import { products } from '@/data/metadata';
import { notFound } from 'next/navigation';
import MediaGallery from './MediaGallery';
import TextDescription from '@/app/components/TextDescription';
import Colors from '@/app/components/Colors';
import LongImage from '@/app/components/LongImage';
import Breadcrumb from '@/app/components/Breadcrumb';

type Props = {
  params: {
    slug: string;
  };
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await Promise.resolve(params);
  const operationTypes = products[slug as keyof typeof products];

  // If product doesn't exist or has operation types, show 404
  if (!(slug in products) || (operationTypes && operationTypes.length > 0)) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Blinds', href: '/blinds' },
    { label: slug.charAt(0).toUpperCase() + slug.slice(1) }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="text-3xl font-bold mb-8">{slug.charAt(0).toUpperCase() + slug.slice(1)} Blind</h1>
      
      {/* Mobile Layout */}
      <div className="flex flex-col items-center lg:hidden">
        <div className="w-[85vw]">
          <MediaGallery slug={slug} />
        </div>
        <div className="w-[90vw] max-w-[500px] mt-6">
          <TextDescription slug={slug} />
        </div>
        <div className="w-[90vw] max-w-[500px] mt-[5vw]">
          <Colors slug={slug} />
        </div>
        <LongImage slug={slug} />
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-8">
        <div className="max-w-[500px]">
          <MediaGallery slug={slug} />
        </div>
        <div>
          <TextDescription slug={slug} />
          <Colors slug={slug} />
        </div>
      </div>
      <div className="hidden lg:block">
        <LongImage slug={slug} />
      </div>
    </div>
  );
} 