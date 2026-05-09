'use client'

import React from 'react'
import { IoAdd, IoRemove, IoTrashOutline } from 'react-icons/io5'
import { CartItem as CartItemType, useCart } from '@/context/CartContext'

const CartItem = ({ item }: { item: CartItemType }) => {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="flex items-center gap-4 border-b border-slate-100 py-4 last:border-0">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-50">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-contain p-2"
        />
      </div>

      <div className="flex flex-grow flex-col">
        <div className="flex items-start justify-between">
          <h4 className="text-sm font-semibold text-slate-900 line-clamp-1">{item.name}</h4>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-slate-400 hover:text-red-500 transition-colors"
          >
            <IoTrashOutline size={18} />
          </button>
        </div>
        
        <p className="mt-1 text-xs text-slate-500">{item.category}</p>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-md border border-slate-100 p-0.5">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="flex size-6 items-center justify-center rounded hover:bg-slate-50 text-slate-500"
            >
              <IoRemove size={14} />
            </button>
            <span className="w-5 text-center text-xs font-medium text-slate-900">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="flex size-6 items-center justify-center rounded hover:bg-slate-50 text-slate-500"
            >
              <IoAdd size={14} />
            </button>
          </div>
          
          <p className="text-sm font-bold text-emerald-800">
            {(item.price * item.quantity).toLocaleString('vi-VN')} VND
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartItem
