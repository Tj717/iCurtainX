import { products } from '@/data/metadata';
import ProductCard from '../components/ProductCard';

export default function BlindsPage() {
  // Get all blind types from the products object
  const allBlindTypes = Object.keys(products);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Blinds Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allBlindTypes.map((blindType) => {
          const operationTypes = products[blindType as keyof typeof products];

          return (
            <ProductCard
              key={blindType}
              name={blindType.charAt(0).toUpperCase() + blindType.slice(1)}
              operationTypes={operationTypes}
              slug={blindType}
              thumbnail={`/blinds/${blindType}/thumbnail.jpg`}
            />
          );
        })}
      </div>
    </div>
  );
} 