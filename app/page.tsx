'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { FilterSection } from '@/components/FilterSection'
import { ProductCard } from '@/components/ProductCard'
import { CartDrawer } from '@/components/CartDrawer'
import { ProductQuickViewModal } from '@/components/ProductQuickViewModal'

interface Product {
  id: string
  team: string
  kitType: string
  image: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  badge?: 'Sale' | 'New'
  group: string
  continent: string
}

interface CartItem {
  id: string
  team: string
  price: number
  size: string
  quantity: number
  image: string
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    team: 'Argentina',
    kitType: '2026 Home Authentic',
    image: '/jersey-argentina.png',
    price: 89.99,
    originalPrice: 119.99,
    rating: 5,
    reviews: 124,
    badge: 'New',
    group: 'Group C',
    continent: 'South America',
  },
  {
    id: '2',
    team: 'Brazil',
    kitType: '2026 Home Classic',
    image: '/jersey-brazil.png',
    price: 99.99,
    originalPrice: 129.99,
    rating: 5,
    reviews: 98,
    badge: 'Sale',
    group: 'Group G',
    continent: 'South America',
  },
  {
    id: '3',
    team: 'France',
    kitType: '2026 Home Premium',
    image: '/jersey-france.png',
    price: 109.99,
    originalPrice: 139.99,
    rating: 5,
    reviews: 156,
    group: 'Group D',
    continent: 'Europe',
  },
  {
    id: '4',
    team: 'Germany',
    kitType: '2026 Home Classic',
    image: '/jersey-germany.png',
    price: 94.99,
    originalPrice: 129.99,
    rating: 4,
    reviews: 87,
    badge: 'Sale',
    group: 'Group A',
    continent: 'Europe',
  },
  {
    id: '5',
    team: 'Spain',
    kitType: '2026 Home Heritage',
    image: '/jersey-spain.png',
    price: 99.99,
    originalPrice: 134.99,
    rating: 5,
    reviews: 112,
    group: 'Group B',
    continent: 'Europe',
  },
  {
    id: '6',
    team: 'Japan',
    kitType: '2026 Home Legacy',
    image: '/jersey-japan.png',
    price: 84.99,
    originalPrice: 119.99,
    rating: 4,
    reviews: 64,
    badge: 'New',
    group: 'Group E',
    continent: 'Asia',
  },
]

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [quickViewProductId, setQuickViewProductId] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    group: '',
    continent: '',
    sort: 'Newest',
  })

  const filteredProducts = useMemo(() => {
    let products = [...PRODUCTS]

    if (filters.group) {
      products = products.filter((p) => p.group === filters.group)
    }

    if (filters.continent) {
      products = products.filter((p) => p.continent === filters.continent)
    }

    // Sort
    switch (filters.sort) {
      case 'Popularity':
        products.sort((a, b) => b.reviews - a.reviews)
        break
      case 'Price: Low to High':
        products.sort((a, b) => a.price - b.price)
        break
      case 'Price: High to Low':
        products.sort((a, b) => b.price - a.price)
        break
      case 'Newest':
      default:
        products.sort((a, b) => (b.badge === 'New' ? 1 : -1))
    }

    return products
  }, [filters])

  const handleAddToCart = (id: string, quantity: number) => {
    const product = PRODUCTS.find((p) => p.id === id)
    if (!product) return

    const existingItem = cartItems.find((item) => item.id === id)

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      )
    } else {
      setCartItems([
        ...cartItems,
        {
          id,
          team: product.team,
          price: product.price,
          size: 'L',
          quantity,
          image: product.image,
        },
      ])
    }
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const handleFilterChange = (filter: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: value,
    }))
  }

  const quickViewProduct = PRODUCTS.find((p) => p.id === quickViewProductId)

  const handleQuickViewAddToCart = (id: string, size: string, quantity: number) => {
    const product = PRODUCTS.find((p) => p.id === id)
    if (!product) return

    const existingItem = cartItems.find((item) => item.id === id)

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      )
    } else {
      setCartItems([
        ...cartItems,
        {
          id,
          team: product.team,
          price: product.price,
          size,
          quantity,
          image: product.image,
        },
      ])
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header cartCount={cartItems.length} onCartOpen={() => setCartOpen(true)} />
      <HeroSection />
      <FilterSection onFilterChange={handleFilterChange} />

      {/* Products Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Premium World Cup Kits</h2>
          <p className="text-muted-foreground">
            {filteredProducts.length} authentic jerseys available
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={handleAddToCart}
              onQuickView={setQuickViewProductId}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground text-lg">
              No products found matching your filters
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">About WC Kits</h3>
              <p className="text-sm text-muted-foreground">
                Premium authentic World Cup jerseys for passionate fans worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition">Shipping Info</a></li>
                <li><a href="#" className="hover:text-primary transition">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Shop All</a></li>
                <li><a href="#" className="hover:text-primary transition">New Arrivals</a></li>
                <li><a href="#" className="hover:text-primary transition">Sale</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4">Follow Us</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Instagram</a></li>
                <li><a href="#" className="hover:text-primary transition">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
            <p>&copy; 2024 WC Kits. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {quickViewProduct && (
        <ProductQuickViewModal
          isOpen={!!quickViewProductId}
          onClose={() => setQuickViewProductId(null)}
          product={quickViewProduct}
          onAddToCart={handleQuickViewAddToCart}
        />
      )}
    </div>
  )
}
