import { products } from '@/data/metadata';
import ProductCard from '../../components/ProductCard';
import { notFound, redirect } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
};

export default async function BlindOperationTypesPage({ params }: Props) {
  const { slug } = await Promise.resolve(params);
  const operationTypes = products[slug as keyof typeof products];

  // If product doesn't exist in metadata, show 404
  if (!(slug in products)) {
    notFound();
  }

  // If operation types array is empty, redirect to detail page
  if (!operationTypes || operationTypes.length === 0) {
    redirect(`/blinds/${slug}/detail`);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {slug.charAt(0).toUpperCase() + slug.slice(1)} Blinds
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {operationTypes.map((operationType) => (
          <ProductCard
            key={operationType}
            name={operationType.charAt(0).toUpperCase() + operationType.slice(1)}
            slug={slug}
            isOperationType={true}
            thumbnail={`/blinds/${slug}/${operationType}/thumbnail.jpg`}
          />
        ))}
      </div>
    </div>
  );
} 