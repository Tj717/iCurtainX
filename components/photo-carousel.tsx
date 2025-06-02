"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PhotoCarouselProps {
  photos: {
    src: string
    alt: string
  }[]
}

export default function PhotoCarousel({ photos }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollToNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const scrollToPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      {/* Mobile Scroll Container */}
      <div ref={scrollContainerRef} className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
        {photos.map((photo, index) => (
          <div key={index} className="min-w-[280px] md:min-w-[350px] h-[280px] md:h-[350px] flex-shrink-0 snap-center">
            <div className="relative w-full h-full">
              <Image src={photo.src || "/placeholder.svg"} alt={photo.alt} fill className="object-cover rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white hidden md:flex"
        onClick={scrollToPrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white hidden md:flex"
        onClick={scrollToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}

