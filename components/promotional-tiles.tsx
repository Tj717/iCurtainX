import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function PromotionalTiles() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {/* Pro Measure & Install Tile */}
      <div className="relative bg-blue-500 text-white rounded-md overflow-hidden">
        <div className="flex">
          <div className="w-1/2">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Professional measuring blinds"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2 p-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-2">PRO MEASURE & INSTALL</h2>
            <div className="bg-yellow-400 text-black inline-block px-2 py-1 mb-4 text-sm">$0 MEASURE ($50 VALUE)</div>
            <Button className="bg-white text-blue-500 hover:bg-gray-100 w-fit">CHECK AVAILABILITY</Button>
          </div>
        </div>
      </div>

      {/* Big Spring Special Buys Tile */}
      <div className="relative bg-blue-500 text-white rounded-md overflow-hidden">
        <div className="flex">
          <div className="w-1/2 p-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-2">BIG SPRING SPECIAL BUYS</h2>
            <Button className="bg-white text-blue-500 hover:bg-gray-100 w-fit">SHOP NOW</Button>
          </div>
          <div className="w-1/2">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Window blinds"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

