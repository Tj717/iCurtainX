import { Button } from "@/components/ui/button"

export default function ValuePropositions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {/* Pro Do It */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Rather have a pro do it?</h3>
        <p className="text-gray-600 mb-4">Add professional measure and install for one low price!</p>
        <Button variant="outline" className="border-blue-500 text-blue-500">
          Check Availability
        </Button>
      </div>

      {/* Risk Free */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Buy Risk-Free</h3>
        <p className="text-gray-600 mb-4">Get the perfect fit and our 100% satisfaction guarantee</p>
        <Button variant="outline" className="border-blue-500 text-blue-500">
          Read our Guarantees
        </Button>
      </div>

      {/* Inspiration */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Find your Inspiration</h3>
        <p className="text-gray-600 mb-4">See real customer photos and snag the looks you love!</p>
        <Button variant="outline" className="border-blue-500 text-blue-500">
          Shop Our Gallery
        </Button>
      </div>
    </div>
  )
}

