import Link from "next/link"
import { ChevronRight, Home, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

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

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-600 mb-8">We're here to help with your window treatment needs</p>

        <div className="md:grid md:grid-cols-2 md:gap-8">
          {/* Contact Info */}
          <div className="p-6 bg-white rounded-lg shadow-sm mb-6 md:mb-0">
            <div className="grid gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-blue-800" />
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-blue-800 font-bold">800-505-1905</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-blue-800" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-blue-800 font-bold">support@icurtainx.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-6 bg-gray-200 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Send us a message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone
                </label>
                <Input id="phone" placeholder="Your phone number" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea id="message" placeholder="How can we help you?" rows={4} />
              </div>

              <Button className="w-full bg-blue-800 hover:bg-blue-900">Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

