'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { collection, getDocs, query, where } from 'firebase/firestore'
import ProductModal from './ProductModal'
import { getDb } from '../utils/firebaseConfig'

interface Product {
  id: string
  name: string
  description: string
  image: string
  category: string
  quantity?: number
  price?: number
}

export default function ProductSection({
  title,
  category,
  eyebrow,
}: {
  title: string
  category: string
  eyebrow: string
}) {
  const [filtered, setFiltered] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(getDb(), 'products'), where('category', '==', category))
        const querySnapshot = await getDocs(q)
        const products: Product[] = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        })) as Product[]
        setFiltered(products)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [category])

  const visible = filtered.slice(0, 12)

  return (
    <section id={category} className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-stone-200 pb-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">{eyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">{title}</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-600">
          {filtered.length > 0
            ? `Hiển thị ${visible.length} / ${filtered.length} sản phẩm trong danh mục này.`
            : 'Danh mục đang được cập nhật sản phẩm.'}
        </p>
      </div>

      <div className="grid min-h-[360px] grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {visible.map((product, index) => (
          <motion.button
            key={product.id || index}
            type="button"
            onClick={() => setSelectedProduct(product)}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: Math.min(index * 0.025, 0.18) }}
            className="group overflow-hidden rounded-lg border border-stone-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-950/10"
          >
            <div className="aspect-square overflow-hidden bg-stone-100">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center px-3 text-center text-xs text-slate-400">
                  Chưa có ảnh
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="line-clamp-2 min-h-[40px] text-sm font-semibold leading-5 text-slate-950">
                {product.name}
              </h3>
              <p className="mt-2 line-clamp-2 min-h-[36px] text-xs leading-[18px] text-slate-500">
                {product.description}
              </p>
              <div className="mt-3">
                <p className="truncate text-sm font-semibold text-emerald-800">
                  {typeof product.price === 'number' ? `${product.price.toLocaleString('vi-VN')} VND` : 'Liên hệ'}
                </p>
                <span className="mt-2 inline-flex h-7 items-center rounded-md bg-slate-950 px-2.5 text-xs font-semibold text-white transition group-hover:bg-emerald-800">
                  Chi tiết
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  )
}
