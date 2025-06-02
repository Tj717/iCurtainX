"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, Phone, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Only close if clicking the overlay itself, not its children
    if (e.target === e.currentTarget) {
      setIsMenuOpen(false)
    }
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-blue-900 text-white p-2 flex items-center justify-between md:hidden z-50">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="VERYicurtainx.com"
            width={180}
            height={36}
            className="h-9 w-auto brightness-0 invert"
            priority
          />
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/contact">
            <Button variant="ghost" size="icon" className="text-white">
              <Phone className="h-5 w-5" />
            </Button>
          </Link>
          {/* Shopping cart temporarily disabled
          <Button variant="ghost" size="icon" className="text-white">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          */}
        </div>
      </div>
      {/* Add padding to account for fixed header */}
      <div className="h-[53px] md:hidden"></div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          onClick={handleOverlayClick}
        >
          <div className="fixed top-0 left-0 right-0 bg-blue-50 shadow-lg">
            <div className="p-2 border-b flex justify-between items-center">
              <div className="w-10"></div> {/* Spacer to balance the close button */}
              <span className="text-lg font-semibold text-gray-800">Menu</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/blinds" 
                    className="block py-2 text-gray-800 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blinds
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/types" 
                    className="block py-2 text-gray-800 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Types
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className="block py-2 text-gray-800 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/customer-photos" 
                    className="block py-2 text-gray-800 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Customer Photos
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

