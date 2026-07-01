'use client'

import { useState } from 'react'
import { ProductDetailPage } from '@/components/ProductDetailPage'

interface ProductDetailPageClientProps {
  product: {
    productId: string
    team: string
    title: string
    images: Array<{ id: string; url: string; alt: string }>
    price: number
    originalPrice: number
    rating: number
    reviews: number
    description: string
    fabricTech: string[]
  }
}

interface ProductCustomization {
  size: string
  quantity: number
  addPrinting: boolean
  playerName?: string
  playerNumber?: string
  badge?: string
}

export function ProductDetailPageClient({ product }: ProductDetailPageClientProps) {
  const handleAddToCart = (productId: string, customization: ProductCustomization) => {
    const customizationText = customization.addPrinting
      ? ` (${customization.playerName} #${customization.playerNumber})`
      : ''

    console.log('[v0] Product added to cart:', {
      productId,
      ...customization,
      customizationText,
    })

    // TODO: Integrate with actual cart system
  }

  return (
    <ProductDetailPage
      productId={product.productId}
      team={product.team}
      title={product.title}
      images={product.images}
      price={product.price}
      originalPrice={product.originalPrice}
      rating={product.rating}
      reviews={product.reviews}
      description={product.description}
      fabricTech={product.fabricTech}
      onAddToCart={handleAddToCart}
    />
  )
}
