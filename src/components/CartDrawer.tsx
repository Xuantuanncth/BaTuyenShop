'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoClose, IoArrowBack } from 'react-icons/io5'
import { useCart } from '@/context/CartContext'
import CartItem from './CartItem'
import CheckoutForm from './CheckoutForm'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, totalAmount, totalQuantity } = useCart()
  const [step, setStep] = useState<'cart' | 'checkout'>('cart')

  const handleClose = () => {
    onClose()
    setTimeout(() => setStep('cart'), 300) // Reset to cart after closing
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex justify-end overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <div className="flex items-center gap-3">
                {step === 'checkout' && (
                  <button 
                    onClick={() => setStep('cart')}
                    className="p-1 -ml-1 text-slate-500 hover:text-emerald-700 transition-colors"
                  >
                    <IoArrowBack size={24} />
                  </button>
                )}
                <h2 className="text-xl font-bold text-slate-900">
                  {step === 'cart' ? `Giỏ hàng (${totalQuantity})` : 'Thông tin đặt hàng'}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-900 transition-colors"
              >
                <IoClose size={28} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-grow overflow-y-auto p-6 scrollbar-hide">
              {step === 'cart' ? (
                items.length > 0 ? (
                  <div className="space-y-2">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-slate-50 text-slate-300">
                      <IoClose size={40} />
                    </div>
                    <p className="text-base font-medium text-slate-500">Giỏ hàng của bạn đang trống</p>
                    <button
                      onClick={handleClose}
                      className="mt-4 text-sm font-bold text-emerald-700 hover:underline"
                    >
                      Tiếp tục mua sắm
                    </button>
                  </div>
                )
              ) : (
                <CheckoutForm onBack={() => setStep('cart')} onSuccess={handleClose} />
              )}
            </div>

            {/* Footer */}
            {step === 'cart' && items.length > 0 && (
              <div className="border-t border-slate-100 p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-base font-medium text-slate-500">Tổng cộng</span>
                  <span className="text-2xl font-bold text-emerald-800">
                    {totalAmount.toLocaleString('vi-VN')} VND
                  </span>
                </div>
                <button
                  onClick={() => setStep('checkout')}
                  className="flex h-14 w-full items-center justify-center rounded-xl bg-slate-950 text-base font-bold text-white transition-all hover:bg-emerald-800 active:scale-[0.98]"
                >
                  Tiến hành đặt hàng
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer
