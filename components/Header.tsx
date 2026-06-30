'use client'

import { ShoppingCart, Search, User } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  cartCount: number
  onCartOpen: () => void
}

export function Header({ cartCount, onCartOpen }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-background font-bold text-sm">WC</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline">WC Kits</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex gap-8">
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Teams</a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">New Arrivals</a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Sale</a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden sm:flex items-center bg-surface border border-border rounded px-3 py-2 w-32 lg:w-48">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none w-full"
              />
              <Search size={16} className="text-muted-foreground" />
            </div>

            {/* Cart */}
            <button
              onClick={onCartOpen}
              className="relative p-2 hover:bg-surface rounded transition-colors"
            >
              <ShoppingCart size={20} className="text-foreground" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User */}
            <button className="p-2 hover:bg-surface rounded transition-colors hidden sm:block">
              <User size={20} className="text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
