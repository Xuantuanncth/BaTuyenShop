import React from 'react'

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
  if (!product) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-2xl">
        <img src={product.image} alt={product.name} className="h-72 w-full object-cover" />
        <div className="p-6">
          <h2 id="modal-title" className="text-2xl font-semibold text-slate-950">{product.name}</h2>
          <p id="modal-description" className="mt-3 leading-7 text-slate-600">{product.description}</p>
          <p className="mt-5 text-xl font-semibold text-emerald-800">
            {typeof product.price === 'number' ? `${product.price.toLocaleString('vi-VN')} VND` : 'Liên hệ'}
          </p>
          <button
            onClick={onClose}
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
