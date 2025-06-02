import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/products"

interface CategoryGridProps {
  categories: string[]
  products: Product[]
}

export default function CategoryGrid({ categories, products }: CategoryGridProps) {
  // Get first product of each category to use as representative
  const categoryProducts = categories.map((category) => {
    return {
      category,
      product: products.find((p) => p.category === category),
    }
  })

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categoryProducts.map(({ category, product }) => (
        <Link
          href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
          key={category}
          className="bg-white rounded-md overflow-hidden border"
        >
          <div className="relative aspect-square">
            <Image src={product?.images[0] || "/placeholder.svg"} alt={category} fill className="object-cover" />
          </div>
          <div className="p-3 text-center">
            <h3 className="text-blue-800 font-medium">{category}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}

