'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiEye } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'

interface Product {
  id: string
  name: string
  description: string
  image: string
  category: string
  quantity?: number
  price?: number
}

interface ProductCardProps {
  product: Product
  onOpenDetails: (product: Product) => void
}

const ProductCard = ({ product, onOpenDetails }: ProductCardProps) => {
  const { addToCart } = useCart()
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product, 1)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white transition-all duration-300 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/5"
    >
      {/* Image Container */}
      <div 
        className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100 cursor-pointer"
        onClick={() => onOpenDetails(product)}
      >
        {/* Skeleton Loader */}
        {!isImageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-stone-200" />
        )}
        
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            onLoad={() => setIsImageLoaded(true)}
            className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
            Chưa có ảnh
          </div>
        )}

        {/* Hover Actions Overlay (Desktop) */}
        <div className="absolute inset-0 hidden items-center justify-center gap-3 bg-slate-900/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
          <button
            onClick={handleQuickAdd}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition-transform hover:scale-110 hover:text-emerald-700"
            title="Thêm nhanh vào giỏ"
          >
            <FiShoppingCart size={20} />
          </button>
          <button
            onClick={() => onOpenDetails(product)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition-transform hover:scale-110 hover:text-emerald-700"
            title="Xem chi tiết"
          >
            <FiEye size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col p-3 sm:p-4">
        <div 
          className="flex-grow cursor-pointer"
          onClick={() => onOpenDetails(product)}
        >
          <h3 className="line-clamp-2 text-sm font-bold leading-5 text-slate-950 transition-colors group-hover:text-emerald-800">
            {product.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[11px] leading-[16px] text-slate-500">
            {product.description}
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <p className="text-sm font-bold text-emerald-800">
            {typeof product.price === 'number' ? `${product.price.toLocaleString('vi-VN')} VND` : 'Liên hệ'}
          </p>

          {/* Mobile Buttons / Desktop Fallback */}
          <div className="flex gap-2">
            <button
              onClick={handleQuickAdd}
              className="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-700 text-[11px] font-bold text-white transition hover:bg-emerald-800 active:scale-95 md:h-10"
            >
              <FiShoppingCart className="hidden xs:block" />
              <span>Thêm giỏ</span>
            </button>
            <button
              onClick={() => onOpenDetails(product)}
              className="flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-[11px] font-bold text-slate-700 transition hover:bg-slate-50 active:scale-95 md:h-10"
            >
              <FiEye />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
