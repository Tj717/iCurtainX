import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <div className="relative mb-6">
      <Image
        src="/placeholder.svg?height=500&width=1200"
        alt="Window with blinds"
        width={1200}
        height={500}
        className="w-full h-auto object-cover"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-7xl font-bold mb-2">40% OFF</h1>
        <p className="text-xl mb-6">WITH MIN PURCHASE</p>
        <Button className="bg-white text-blue-900 hover:bg-gray-100">SHOP NOW</Button>
        <p className="mt-4 text-sm">SALE ENDS 4/1</p>
      </div>
    </div>
  )
}

