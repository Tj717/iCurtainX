import Link from "next/link"
import Image from "next/image"
import { Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="mb-4">
              <Image
                src="/logo.png"
                alt="VERYicurtainx.com"
                width={200}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-600">Your one-stop shop for quality window treatments</p>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-800" />
              <span className="text-blue-800 font-bold">800-505-1905</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-800" />
              <span className="text-blue-800 font-bold">support@icurtainx.com</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Mon-Fri: 8am-8pm ET | Sat-Sun: 9am-6pm ET</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} icurtainx.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

