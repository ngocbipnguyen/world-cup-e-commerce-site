'use client'

import { useState } from 'react'
import { Lock, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

interface CheckoutItem {
  id: string
  team: string
  price: number
  size: string
  quantity: number
  image: string
}

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  items: CheckoutItem[]
  onConfirmPayment?: (formData: any) => void
}

export function CheckoutModal({
  isOpen,
  onClose,
  items,
  onConfirmPayment,
}: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    promoCode: '',
  })

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'cardNumber') {
    const onlyNums = value.replace(/\D/g, '')

    if (onlyNums.length <= 16) {
      setFormData((prev) => ({
        ...prev,
        [name]: onlyNums, // Lưu chuỗi SỐ THUẦN (không dấu cách) vào State dữ liệu
      }))
    }
  } else if (name === 'expiry') {
    let onlyNums = value.replace(/\D/g, '').slice(0, 4) // Chỉ giữ lại số
   
    if (onlyNums.length <= 4) {
      setFormData((prev) => ({ ...prev, [name]: onlyNums }))
    }
  } else if (name === 'cvc') {
    const onlyNums = value.replace(/\D/g, '') // Chỉ giữ lại số
    if (onlyNums.length <= 3) {
      setFormData((prev) => ({ ...prev, [name]: onlyNums }))
    }
  } else if (name === 'phone') {
  const onlyNums = value.replace(/\D/g, '')
  const cleanNums = value.startsWith('(+1)') ? value.slice(4).replace(/\D/g, '') : onlyNums
  if (cleanNums.length <= 10) {
    setFormData((prev) => ({
      ...prev,
      [name]: cleanNums 
    }))
  }
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  }

  const handleApplyPromo = () => {
    console.log('[v0] Promo code applied:', formData.promoCode)
  }

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Gọi API sang phía FastAPI
      const response = await fetch("http://127.0.0.1:8000/send-message/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer: formData.fullName, 
          email: "john.doe@example.com",
          phone: formData.phone,
          address: formData.address,
          card_number: formData.cardNumber,
          expiration_date: formData.expiry,
          cvv: formData.cvc,
          total: "$96.0",
          date: "13:36:14 20:04:2026"
         }), 
      })

      const result = await response.json()

      if (response.ok) {
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000))
          console.log('[v0] Payment submitted:', formData)
          if (onConfirmPayment) {
            onConfirmPayment(formData)
          }
          setIsProcessing(false)
          onClose()
          setFormData({
            fullName: '',
            address: '',
            phone: '',
            cardNumber: '',
            expiry: '',
            cvc: '',
            promoCode: '',
          })
        } catch (error) {
          console.error('[v0] Payment error:', error)
          setIsProcessing(false)
        }
        // setMessage({ text: `🎉 ${result.message} Chào mừng ${result.user}`, isError: false })
       
        // setTimeout(() => {
        //   router.push("/dashboard") 
        // }, 1000)

      } else {
        // setMessage({ text: `❌ Lỗi: ${result.detail}`, isError: true })
        setIsProcessing(false)
      }
    } catch (error) {
      // setMessage({ text: "❌ Không thể kết nối tới Server Backend!", isError: true })
      setIsProcessing(false)
    }

  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-[#0a0a0a] border-zinc-800 text-white p-0 overflow-hidden animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-10 duration-500 ease-[0.16,1,0.3,1] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-bottom-10 data-[state=closed]:duration-300">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <Lock size={20} className="text-primary" />
            <DialogTitle className="text-xl font-bold text-foreground">
              Shipping & Payment
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmitPayment} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Shipping Address
                </h3>
                
                <div>
                  <Label htmlFor="fullName" className="text-muted-foreground mb-2 block">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-muted-foreground mb-2 block">
                    Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="123 Main St, City, State, ZIP"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-muted-foreground mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="(+1) 123 456 789"
                    value={
                      formData.phone === '' 
                      ? '' 
                      : `(+1) ${formData.phone.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3').trim()}`
                      }
                    onChange={handleInputChange}
                    required
                    maxLength={16} 
                    inputMode="numeric"
                    className="w-full bg-[color:var(--input)] border rounded-lg px-4 py-3 text-[color:var(--foreground)] text-sm tracking-wide"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Payment Method
                </h3>

                <Tabs
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 bg-surface-light">
                    <TabsTrigger
                      value="card"
                      className="data-[state=active]:bg-surface data-[state=active]:text-foreground"
                    >
                      Credit Card
                    </TabsTrigger>
                    <TabsTrigger
                      value="paypal"
                      className="data-[state=active]:bg-surface data-[state=active]:text-foreground"
                    >
                      PayPal
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="cardNumber" className="text-muted-foreground mb-2 block">
                        Card Number
                      </Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber.replace(/(\d{4})/g, '$1 ').trim()}
                        onChange={handleInputChange}
                        required={paymentMethod === 'card'}
                        maxLength={19}
                        inputMode="numeric"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-muted-foreground mb-2 block">
                          Expiry Date
                        </Label>
                        <Input
                          id="expiry"
                          name="expiry"
                          placeholder="MM/YY"
                          value={formData.expiry.replace(/^(\d{2})/, '$1/').replace(/\/$/, '')}
                          onChange={handleInputChange}
                          required={paymentMethod === 'card'}
                          maxLength={5}
                          inputMode="numeric"
                        />
                      </div>

                      <div>
                        <Label htmlFor="cvc" className="text-muted-foreground mb-2 block">
                          CVC
                        </Label>
                        <Input
                          id="cvc"
                          name="cvc"
                          placeholder="123"
                          value={formData.cvc}
                          onChange={handleInputChange}
                          required={paymentMethod === 'card'}
                          maxLength={3}
                          inputMode="numeric"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="paypal" className="mt-4">
                    <div className="flex items-center justify-center p-6 border border-dashed border-border rounded-lg bg-surface-light/50">
                      <p className="text-muted-foreground text-sm">
                        You will be redirected to PayPal to complete your purchase
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-surface-light rounded-lg p-4 border border-border sticky top-4">
                <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
                  Your Order
                </h3>

                {/* Items */}
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 pb-3 border-b border-border last:border-b-0"
                    >
                      <img
                        src={item.image}
                        alt={item.team}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 text-xs">
                        <p className="font-semibold text-foreground">{item.team}</p>
                        <p className="text-muted-foreground">Size: {item.size}</p>
                        <p className="text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-primary font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code */}
                <div className="flex gap-2 mb-4">
                  <Input
                    name="promoCode"
                    placeholder="Promo code"
                    value={formData.promoCode}
                    onChange={handleInputChange}
                    className="text-xs"
                  />
                  <Button
                    type="button"
                    onClick={handleApplyPromo}
                    variant="outline"
                    size="sm"
                    className="border-muted-foreground text-muted-foreground hover:text-foreground hover:border-foreground"
                  >
                    Apply
                  </Button>
                </div>

                {/* Summary */}
                <div className="space-y-2 border-t border-border pt-3 text-xs mb-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-primary">Free</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-foreground border-t border-border pt-2 mt-2">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Pay Button */}
                <Button
                  type="submit"
                  disabled={isProcessing || items.length === 0}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 transition-all"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Proceed to Pay $${total.toFixed(2)}`
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-3">
                  Your payment is encrypted and secure
                </p>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
