"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { products } from "@/lib/products"
import CustomerPhotos from "@/app/components/CustomerPhotos"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [customerPhotos, setCustomerPhotos] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/media?path=blinds/picture-demo/all')
      .then(res => res.json())
      .then(files => {
        const imageFiles = files.filter((file: string) => 
          decodeURIComponent(file).match(/\.(jpg|jpeg|png|webp)$/i)
        );
        setCustomerPhotos(imageFiles);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching photos:', error);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }

  // Get the most popular products (zebra and roller)
  const popularProducts = products.filter((product) => 
    product.id === "zebra" || 
    product.id === "roller" || 
    product.id === "honeycomb"
  )

  return (
    <main className="min-h-[calc(100vh-200px)]">
      {/* Mobile Search Bar - only visible on mobile */}
      {/* <div className="px-4 py-2 bg-white md:hidden">
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="text"
            placeholder="Search"
            className="pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div> */}

      {/* Hero Banner */}
      <div className="relative">
        <Image
          src="/banner.png"
          alt="Window with blinds"
          width={600}
          height={300}
          className="w-full h-auto md:h-[400px] md:object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/30">
          <h1 className="text-lg md:text-5xl font-extrabold md:font-bold mb-8">Unbeatable Price</h1>
          <h1 className="text-lg md:text-5xl font-extrabold md:font-bold mb-8">Exceptional Quality Built to Last</h1>
          <h1 className="text-lg md:text-5xl font-extrabold md:font-bold">Tailored to Your Needs</h1>
        </div>
      </div>

      {/* Popular Products */}
      <div className="p-4 md:p-8 bg-gray-100">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Shop Our Most Popular Products</h2>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularProducts.map((product) => (
              <Link href={`/blinds/${product.id}`} key={product.id} className="group">
                <div className="border rounded-lg overflow-hidden transition-all hover:shadow-md bg-white">
                  <div className="relative aspect-square">
                    <Image
                      src={`/blinds/${product.id}/thumbnail.jpg`}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-medium text-blue-900 group-hover:text-blue-700 transition-colors">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-gray-600">Our best-selling window treatment</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blinds">
              <Button className="bg-blue-800 hover:bg-blue-900 text-white">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Customer Photos Section */}
      <div className="py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Customer Photos</h2>
            <p className="text-gray-600">
              Mention @iCurtainX in your Instagram photos for a chance to be featured on our site!
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="w-full max-w-7xl mx-auto px-4">
                <CustomerPhotos 
                  photos={customerPhotos} 
                  limit={6} 
                  singleRow={true}
                />
              </div>
              <div className="mt-8 text-center">
                <Link href="/customer-photos">
                  <Button variant="outline" className="border-blue-700 text-blue-700 hover:bg-blue-50">
                    See More Photos
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

