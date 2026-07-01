'use client'

import { useState } from 'react'
import { X, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CheckoutModal } from '@/components/CheckoutModal'

interface CartItem {
  id: string
  team: string
  price: number
  size: string
  quantity: number
  image: string
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleCheckoutClick = () => {
    setCheckoutOpen(true)
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-zinc-800 shadow-2xl z-50 transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-light rounded transition-colors"
          >
            <X size={20} className="text-foreground" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 border border-border rounded-lg p-3 bg-surface-light"
              >
                <img
                  src={item.image}
                  alt={item.team}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-foreground">{item.team}</h3>
                  <p className="text-xs text-muted-foreground mb-2">Size: {item.size}</p>
                  <p className="font-bold text-sm text-primary">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 hover:bg-surface rounded transition-colors"
                  >
                    <X size={16} className="text-muted-foreground" />
                  </button>
                  <div className="flex items-center gap-2 bg-surface rounded">
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="p-1 hover:text-primary transition-colors"
                    >
                      <Minus size={14} className="text-muted-foreground" />
                    </button>
                    <span className="w-6 text-center text-sm text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:text-primary transition-colors"
                    >
                      <Plus size={14} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4 space-y-4">
          {items.length > 0 && (
            <>
              {/* Coupon */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="flex-1 bg-surface-light border border-border rounded px-3 py-2 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary"
                >
                  Apply
                </Button>
              </div>

              {/* Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-foreground border-t border-border pt-2">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}

          <Button
            onClick={handleCheckoutClick}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={items.length === 0}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={items}
      />
    </>
  )
}
