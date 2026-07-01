'use client'

import { useState } from 'react'
import { Heart, Minus, Plus, Star, ShoppingCart, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ProductImage {
  id: string
  url: string
  alt: string
}

interface ProductDetailPageProps {
  productId: string
  team: string
  title: string
  images: ProductImage[]
  price: number
  originalPrice: number
  rating: number
  reviews: number
  description: string
  fabricTech: string[]
  onAddToCart: (productId: string, customization: ProductCustomization) => void
}

interface ProductCustomization {
  size: string
  quantity: number
  addPrinting: boolean
  playerName?: string
  playerNumber?: string
  badge?: string
}

export function ProductDetailPage({
  productId,
  team,
  title,
  images,
  price,
  originalPrice,
  rating,
  reviews,
  description,
  fabricTech,
  onAddToCart,
}: ProductDetailPageProps) {
  // State management
  const [selectedSize, setSelectedSize] = useState<string>('M')
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addPrinting, setAddPrinting] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [playerNumber, setPlayerNumber] = useState('')
  const [selectedBadge, setSelectedBadge] = useState('None')
  const [isAdding, setIsAdding] = useState(false)

  const discount = Math.round(((originalPrice - price) / originalPrice) * 100)
  const printingCost = addPrinting ? 10 : 0

  const handleAddToCart = () => {
    setIsAdding(true)
    setTimeout(() => {
      onAddToCart(productId, {
        size: selectedSize,
        quantity,
        addPrinting,
        playerName: addPrinting ? playerName : undefined,
        playerNumber: addPrinting ? playerNumber : undefined,
        badge: addPrinting ? selectedBadge : undefined,
      })
      setIsAdding(false)
    }, 600)
  }

  const sizes = ['S', 'M', 'L', 'XL', 'XXL']
  const badges = ['None', 'World Cup Champions Badge', 'FIFA Living Football Patch']

  return (
    <div className="min-h-screen bg-background">
      {/* Top Section - 2 Column Layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT COLUMN - Product Media Showcase */}
          <div className="flex flex-col gap-4">
            {/* Main Image Display */}
            <div className="relative overflow-hidden rounded-lg bg-surface-light aspect-square flex items-center justify-center">
              <img
                src={images[activeImageIndex]?.url}
                alt={images[activeImageIndex]?.alt || 'Product image'}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery - Horizontal Scrollable */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((image, idx) => (
                <button
                  key={image.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                    activeImageIndex === idx
                      ? 'border-primary'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - Selection & Customization Hub */}
          <div className="flex flex-col gap-6">
            {/* Breadcrumbs & Meta */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <a href="/" className="hover:text-foreground transition">Home</a>
                <span>/</span>
                <a href="/shop" className="hover:text-foreground transition">National Kits</a>
                <span>/</span>
                <span className="text-foreground">{team}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase rounded">
                  Authentic
                </span>
              </div>
            </div>

            {/* Header Info */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{title}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < rating ? 'fill-accent text-accent' : 'text-border'}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
              </div>

              {/* Pricing */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">${price.toFixed(2)}</span>
                <span className="text-xl text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
                <span className="text-sm font-bold text-accent-red">{discount}% OFF</span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">SIZE</label>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded font-semibold transition-colors ${
                      selectedSize === size
                        ? 'bg-foreground text-background'
                        : 'bg-surface border border-border hover:border-primary text-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* World Cup Customization Section */}
            <div className="space-y-4 p-4 rounded-lg bg-surface border border-border">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-primary" />
                <h3 className="font-bold text-foreground">Personalize Your Jersey</h3>
              </div>

              {/* Toggle for Printing */}
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={addPrinting}
                  onCheckedChange={(checked) => setAddPrinting(!!checked)}
                />
                <label className="text-sm font-medium text-foreground cursor-pointer">
                  Add Official Name & Number printing <span className="text-primary">(+${printingCost.toFixed(2)})</span>
                </label>
              </div>

              {/* Name & Number Inputs - Revealed when enabled */}
              {addPrinting && (
                <div className="space-y-3 pt-3 border-t border-border">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">
                        Player Name
                      </label>
                      <Input
                        placeholder="MESSI"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value.toUpperCase().slice(0, 15))}
                        className="uppercase"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">
                        Number
                      </label>
                      <Input
                        placeholder="10"
                        type="number"
                        min="0"
                        max="99"
                        value={playerNumber}
                        onChange={(e) => setPlayerNumber(e.target.value.slice(0, 2))}
                      />
                    </div>
                  </div>

                  {/* Badge Selector */}
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase mb-2 block">
                      World Cup Badge
                    </label>
                    <select
                      value={selectedBadge}
                      onChange={(e) => setSelectedBadge(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      {badges.map((badge) => (
                        <option key={badge} value={badge}>
                          {badge}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Quantity & Cart Actions */}
            <div className="space-y-3">
              {/* Quantity Counter */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 rounded bg-surface border border-border hover:border-primary text-foreground transition"
                >
                  <Minus size={18} />
                </button>
                <span className="text-lg font-semibold text-foreground w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 rounded bg-surface border border-border hover:border-primary text-foreground transition"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Add to Basket Button */}
              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full h-12 bg-primary text-primary-foreground text-lg font-bold uppercase hover:shadow-lg hover:shadow-primary/50 active:scale-95 transition-all"
              >
                {isAdding ? 'Adding...' : 'Add to Basket'}
              </Button>

              {/* Add to Wishlist Button */}
              <Button
                onClick={() => setIsWishlisted(!isWishlisted)}
                variant="outline"
                className="w-full h-10 gap-2"
              >
                <Heart
                  size={18}
                  className={isWishlisted ? 'fill-accent text-accent' : 'text-foreground'}
                />
                {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION - Product Specifications & Tabs */}
      <div className="w-full bg-surface/30 border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 mb-8">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-4 py-2"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="fabric"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-4 py-2"
              >
                Fabric Technology
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-4 py-2"
              >
                Shipping & Returns
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-4">
              <p className="text-foreground leading-relaxed">{description}</p>
            </TabsContent>

            <TabsContent value="fabric" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fabricTech.map((tech, idx) => (
                  <div key={idx} className="p-4 rounded bg-surface border border-border">
                    <h4 className="font-semibold text-foreground mb-2">{tech.split(':')[0]}</h4>
                    <p className="text-sm text-muted-foreground">{tech.split(':')[1]}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="space-y-4">
              <div className="space-y-3 text-foreground">
                <p><strong>Free Shipping:</strong> On orders over $50 (US only)</p>
                <p><strong>Processing Time:</strong> 1-2 business days</p>
                <p><strong>Delivery Time:</strong> 5-7 business days for standard shipping</p>
                <p><strong>Returns:</strong> 30-day money-back guarantee. Free returns on all orders.</p>
                <p className="text-sm text-muted-foreground pt-4">For more information, visit our <a href="#" className="text-primary hover:underline">Shipping & Returns Policy</a></p>
              </div>
            </TabsContent>
          </Tabs>

          {/* You May Also Like Section */}
          <div className="mt-16 space-y-8">
            <h2 className="text-2xl font-bold text-foreground">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { team: 'France', title: 'France 2026 Home Jersey', image: '/jersey-france.png', price: 109.99 },
                { team: 'Germany', title: 'Germany 2026 Home Jersey', image: '/jersey-germany.png', price: 94.99 },
                { team: 'Brazil', title: 'Brazil 2026 Home Jersey', image: '/jersey-brazil.png', price: 99.99 },
                { team: 'Spain', title: 'Spain 2026 Home Jersey', image: '/jersey-spain.png', price: 99.99 },
              ].map((item) => (
                <a
                  key={item.team}
                  href={`/product/${item.team.toLowerCase()}`}
                  className="group"
                >
                  <div className="rounded-lg overflow-hidden bg-surface-light mb-3 aspect-square relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition">
                    {item.title}
                  </h3>
                  <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
