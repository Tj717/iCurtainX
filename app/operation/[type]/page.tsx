import { products } from '@/data/metadata';
import ProductCard from '../../components/ProductCard';

type Props = {
  params: {
    type: string;
  };
};

export default function OperationTypePage({ params }: Props) {
  const { type } = params;
  const operationType = type.toLowerCase();
  
  // Get all blinds that have this operation type
  const blinds = Object.entries(products)
    .filter(([_, types]) => types.includes(operationType))
    .map(([blind]) => blind);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {operationType.charAt(0).toUpperCase() + operationType.slice(1)} Blinds
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blinds.map((blindType) => {
          const operationTypes = products[blindType as keyof typeof products];

          return (
            <ProductCard
              key={blindType}
              name={blindType.charAt(0).toUpperCase() + blindType.slice(1)}
              operationTypes={operationTypes}
              slug={blindType}
            />
          );
        })}
      </div>
    </div>
  );
} 