import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"

export default function DesktopHeader() {
  return (
    <div className="hidden md:block">
      {/* Main Navigation */}
      <div className="fixed top-0 left-0 right-0 bg-blue-800 text-white z-50">
        <div className="container mx-auto flex items-center justify-between py-3">
          {/* Logo on left */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="VERYicurtainx.com"
              width={250}
              height={50}
              className="h-12 w-auto brightness-0 invert"
              priority
            />
          </Link>

          {/* Navigation buttons on right */}
          <div className="flex items-center gap-6">
            <Link href="/blinds">
              <Button variant="ghost" className="text-white hover:bg-blue-700 text-lg font-semibold">
                Blinds
              </Button>
            </Link>
            <Link href="/types">
              <Button variant="ghost" className="text-white hover:bg-blue-700 text-lg font-semibold">
                Types
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className="text-white hover:bg-blue-700 text-lg font-semibold">
                Contact Us
              </Button>
            </Link>
            <Link href="/customer-photos">
              <Button variant="ghost" className="text-white hover:bg-blue-700 text-lg font-semibold">
                Customer Photos
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Add padding to account for fixed header */}
      <div className="h-[69px]"></div>
    </div>
  )
}

