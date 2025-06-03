import Link from "next/link"
import { ChevronRight, Home, Mail, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="flex items-center hover:text-blue-600">
          <Home size={16} className="mr-1" />
          Home
        </Link>
        <ChevronRight size={16} />
        <span className="text-gray-900">Contact Us</span>
      </nav>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-600 mb-8">We're here to help with your window treatment needs</p>

        {/* Contact Info */}
        <div className="p-8 bg-white rounded-lg shadow-sm">
          <div className="grid gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <Mail className="h-8 w-8 text-blue-800" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Email</h3>
                <p className="text-blue-800 font-bold text-xl">support@icurtainx.com</p>
              </div>
            </div>
          </div>

          {/* Two images below the email */}
          <div className="mt-8 flex flex-col md:flex-row gap-8">
            <img
              src="https://fhasj7d8bol4e7bf.public.blob.vercel-storage.com/blinds/about%20us/whatsapp-21OVRJD7mWFNEayo6wZHIzvszhMWci.jpg"
              alt="WhatsApp QR Code"
              className="h-[max(400px,30vh)] w-auto object-cover border border-gray-300"
            />
            <img
              src="https://fhasj7d8bol4e7bf.public.blob.vercel-storage.com/blinds/about%20us/wechat-MrcVciw3i3fsIy7PwKKklmEz1F5yEn.jpg"
              alt="WeChat QR Code"
              className="h-[max(400px,30vh)] w-auto object-cover border border-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
