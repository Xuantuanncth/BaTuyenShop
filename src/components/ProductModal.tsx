import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoClose } from 'react-icons/io5'

interface Product {
  id: string
  name: string
  description: string
  image: string
  category: string
  quantity?: number
  price?: number
}

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  return (
    <AnimatePresence>
      {product && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-900 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-emerald-700"
              aria-label="Close modal"
            >
              <IoClose size={24} />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="relative h-64 w-full bg-slate-50 md:h-auto md:w-1/2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain p-4 transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Content Section */}
              <div className="flex flex-col p-6 md:w-1/2 md:p-8">
                <div className="flex-grow">
                  <span className="mb-2 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                    {product.category}
                  </span>
                  <h2 id="modal-title" className="text-2xl font-bold text-slate-950 md:text-3xl">
                    {product.name}
                  </h2>
                  <div className="mt-4 max-h-[200px] overflow-y-auto pr-2">
                    <p id="modal-description" className="text-base leading-relaxed text-slate-600">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Giá bán</p>
                      <p className="mt-1 text-2xl font-bold text-emerald-800">
                        {typeof product.price === 'number' ? `${product.price.toLocaleString('vi-VN')} VND` : 'Liên hệ'}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={onClose}
                    className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-slate-950 px-6 text-base font-semibold text-white transition-all hover:bg-emerald-800 active:scale-[0.98]"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ProductModal
