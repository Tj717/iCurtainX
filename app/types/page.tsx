import { productTypes } from '@/data/metadata';
import ProductCard from '../components/ProductCard';

export default function TypesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Operation Types</h1>
      <div className="space-y-12">
        {Object.entries(productTypes).map(([type, products]) => (
          <div key={type} className="bg-blue-50 rounded-xl border-2 border-gray-200 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-gray-200">
              {type.charAt(0).toUpperCase() + type.slice(1)} Blinds
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product}
                  name={product}
                  slug={product}
                  operationTypes={[type]}
                  isOperationType={true}
                  thumbnail={`/blinds/${product}/${type}/thumbnail.jpg`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 