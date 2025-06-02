import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/products"

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link href={`/all-products/${product.id}`} key={product.id} className="group">
          <div className="border rounded-lg overflow-hidden transition-all hover:shadow-md">
            <div className="relative aspect-square">
              <Image src={`/blinds/${product.id}/thumbnail.jpg`} alt={product.name} fill className="object-cover" />
            </div>
            <div className="p-3 text-center">
              <h3 className="font-medium text-blue-900 group-hover:text-blue-700 transition-colors">{product.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

