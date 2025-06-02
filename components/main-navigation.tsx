"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function MainNavigation() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="bg-blue-800 text-white">
      <div className="container mx-auto flex items-center justify-between py-3">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-blue-700">
              All Products
            </Button>
          </Link>
          <Link href="/?category=blinds">
            <Button variant="ghost" className="text-white hover:bg-blue-700">
              Blinds
            </Button>
          </Link>
          <Link href="/?category=shades">
            <Button variant="ghost" className="text-white hover:bg-blue-700">
              Shades
            </Button>
          </Link>
          <Link href="/?category=shutters">
            <Button variant="ghost" className="text-white hover:bg-blue-700">
              Shutters
            </Button>
          </Link>
          <Link href="/?category=drapes">
            <Button variant="ghost" className="text-white hover:bg-blue-700">
              Drapes
            </Button>
          </Link>
          <Link href="/sale">
            <Button variant="ghost" className="text-white hover:bg-blue-700">
              Sale
            </Button>
          </Link>
        </div>

        {/* <form onSubmit={handleSearch} className="relative w-72">
          <Input
            type="text"
            placeholder="What can we help you find?"
            className="pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
            <Search className="h-4 w-4" />
          </Button>
        </form> */}
      </div>
    </div>
  )
}

