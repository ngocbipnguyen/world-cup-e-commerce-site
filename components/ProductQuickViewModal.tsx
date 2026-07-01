'use client'

import { useState } from 'react'
import { X, Star, Minus, Plus, Flag } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog'

interface ProductQuickViewModalProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: string
    team: string
    kitType: string
    image: string
    price: number
    originalPrice: number
    rating: number
    reviews: number
    group?: string
    continent?: string
  }
  onAddToCart: (id: string, size: string, quantity: number) => void
}

const SIZES = ['S', 'M', 'L', 'XL']
const THUMBNAIL_IMAGES = [
  '/jersey-argentina.png',
  '/jersey-brazil.png',
  '/jersey-france.png',
]

export function ProductQuickViewModal({
  isOpen,
  onClose,
  product,
  onAddToCart,
}: ProductQuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('M')
  const [quantity, setQuantity] = useState<number>(1)
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [activeImage, setActiveImage] = useState<string>(product.image)

  const handleAddToCart = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    onAddToCart(product.id, selectedSize, quantity)
    setIsLoading(false)
    onClose()
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full p-0 bg-white border-0 rounded-lg overflow-hidden animate-in
        overflow-y-auto
        scrollbar-thin
        fade-in-0 zoom-in-95 slide-in-from-bottom-10 
        duration-500 ease-[0.16,1,0.3,1] 
        data-[state=closed]:animate-out 
        data-[state=closed]:fade-out-0 
        data-[state=closed]:zoom-out-95 
        data-[state=closed]:slide-out-to-bottom-10 
        data-[state=closed]:duration-300">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Close Button */}
          <DialogClose className="absolute top-4 right-4 z-50 text-foreground hover:text-foreground/80 transition-colors">
            <X size={24} />
            <span className="sr-only">Close</span>
          </DialogClose>

          {/* Left Column: Product Media */}
          <div className="flex flex-col bg-neutral-50 p-8">
            {/* Main Image */}
            <div className="flex-1 flex items-center justify-center mb-6 min-h-96 md:min-h-full">
              <img
                src={activeImage}
                alt={`${product.team} ${product.kitType}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 justify-center">
              {THUMBNAIL_IMAGES.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() =>  setActiveImage(thumb)}
                  className={`w-16 h-16 rounded border-2 overflow-hidden transition-all ${
                    activeImage === thumb
                      ? 'border-black'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <img
                    src={thumb}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col p-8">
            {/* Category Label */}
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">
              jersey
            </p>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              {product.team} 2026 Home Jersey
            </h2>

            {/* Star Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-neutral-300'
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-neutral-600">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-bold text-black">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-lg text-neutral-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              {discount > 0 && (
                <span className="text-sm font-bold text-red-500">
                  -{discount}% off
                </span>
              )}
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <label className="text-xs font-bold text-black uppercase tracking-wider mb-3 block">
                Size
              </label>
              <div className="grid grid-cols-4 gap-3">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded font-semibold text-sm transition-all ${
                      selectedSize === size
                        ? 'bg-black text-white'
                        : 'bg-neutral-100 text-neutral-700 border border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="text-xs font-bold text-black uppercase tracking-wider mb-3 block">
                Quantity
              </label>
              <div className="flex items-center gap-4 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-neutral-200 rounded hover:bg-neutral-100 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="text-lg font-semibold min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-neutral-200 rounded hover:bg-neutral-100 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-500 text-white font-bold uppercase py-4 rounded transition-all active:scale-95 cursor-pointer mb-6"
            >
              {isLoading ? 'Adding...' : 'Add to Cart'}
            </button>

            {/* Footer Meta */}
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Flag size={16} />
              <span>Team: {product.team}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
