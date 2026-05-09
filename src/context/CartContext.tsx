'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import CartToast from '@/components/CartToast'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  category: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: any, quantity: number) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalAmount: number
  totalQuantity: number
  isMounted: boolean
  showToast: (message: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const [toast, setToast] = useState({ isVisible: false, message: '' })

  const showToast = (message: string) => {
    setToast({ isVisible: true, message })
  }

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }))
  }

  // Hydration safety: only load from localStorage after mounting
  useEffect(() => {
    setIsMounted(true)
    const savedCart = localStorage.getItem('batuyen_cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e)
      }
    }
  }, [])

  // Sync to localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('batuyen_cart', JSON.stringify(items))
    }
  }, [items, isMounted])

  const addToCart = (product: any, quantity: number) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price || 0,
          image: product.image,
          category: product.category,
          quantity: quantity,
        },
      ]
    })
    showToast(`Đã thêm ${quantity} x ${product.name} vào giỏ hàng`)
  }

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalAmount,
        totalQuantity,
        isMounted,
        showToast,
      }}
    >
      {children}
      <CartToast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        onClose={hideToast} 
      />
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
