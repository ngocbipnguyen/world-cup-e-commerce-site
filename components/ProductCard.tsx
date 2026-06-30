'use client'

import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { useState } from 'react'

interface ProductCardProps {
  id: string
  team: string
  kitType: string
  image: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  badge?: 'Sale' | 'New'
  onAddToCart: (id: string, quantity: number) => void
  onQuickView?: (productId: string) => void
}

export function ProductCard({
  id,
  team,
  kitType,
  image,
  price,
  originalPrice,
  rating,
  reviews,
  badge,
  onAddToCart,
  onQuickView,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100)

  return (
    <div className="group bg-surface border border-border rounded-lg overflow-hidden hover:border-primary transition-all hover:shadow-xl hover:shadow-primary/20">
      {/* Image Container */}
      <div className="relative overflow-hidden h-64 bg-surface-light group/image">
        <img
          src={image}
          alt={`${team} ${kitType}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Badge */}
        {badge && (
          <div className={`absolute top-3 left-3 px-3 py-1 rounded text-xs font-bold ${
            badge === 'Sale'
              ? 'bg-accent text-accent-foreground'
              : 'bg-primary text-primary-foreground'
          }`}>
            {badge}
          </div>
        )}

        {/* Action Buttons Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover/image:opacity-100 transition-opacity">
          {onQuickView && (
            <button
              onClick={() => onQuickView(id)}
              className="p-3 bg-white rounded-full hover:bg-primary hover:text-primary-foreground text-foreground transition-all transform hover:scale-110"
              aria-label="Quick View"
            >
              <Eye size={20} />
            </button>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2 bg-surface/80 backdrop-blur rounded-full hover:bg-surface transition-colors z-10"
        >
          <Heart
            size={18}
            className={isWishlisted ? 'fill-accent text-accent' : 'text-foreground'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-base text-foreground truncate">{team}</h3>
        <p className="text-sm text-muted-foreground mb-3">{kitType} Jersey</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(rating) ? 'fill-accent text-accent' : 'text-muted-foreground'}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
          {originalPrice > price && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-accent">-{discount}%</span>
            </>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(id, 1)}
          className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group/btn"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  )
}
