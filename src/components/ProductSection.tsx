'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
  const [start, setStart] = useState(0)
  const [filtered, setFiltered] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(getDb(), 'products'), where('category', '==', category))
        const querySnapshot = await getDocs(q)
        const products: Product[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[]
        setFiltered(products)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [category])

  const visible = filtered.slice(start, start + 3)
  const canPrev = start > 0
  const canNext = start + 3 < filtered.length

  return (
    <section id={category} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">{eyebrow}</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">{title}</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-600">
          {filtered.length > 0 ? `${filtered.length} sản phẩm đang hiển thị trong danh mục này.` : 'Danh mục đang được cập nhật sản phẩm.'}
        </p>
      </div>

      <div className="grid min-h-[420px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="wait">
          {visible.map((p, index) => (
            <motion.div
              key={p.id || index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className="group overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/10"
            >
              <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="line-clamp-2 text-xl font-semibold text-slate-950">{p.name}</h3>
                <p className="mt-2 line-clamp-3 min-h-[72px] text-sm leading-6 text-slate-600">{p.description}</p>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <p className="text-lg font-semibold text-emerald-800">
                    {typeof p.price === 'number' ? `${p.price.toLocaleString('vi-VN')} VND` : 'Liên hệ'}
                  </p>
                  <button
                    onClick={() => setSelectedProduct(p)}
                    className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <button
          className={`flex size-11 items-center justify-center rounded-lg border border-stone-300 bg-white text-lg text-slate-700 transition hover:border-emerald-300 hover:text-emerald-800 ${!canPrev ? 'cursor-not-allowed opacity-40' : ''}`}
          onClick={() => canPrev && setStart(start - 3)}
          disabled={!canPrev}
          aria-label="Sản phẩm trước"
        >
          &larr;
        </button>
        <button
          className={`flex size-11 items-center justify-center rounded-lg border border-stone-300 bg-white text-lg text-slate-700 transition hover:border-emerald-300 hover:text-emerald-800 ${!canNext ? 'cursor-not-allowed opacity-40' : ''}`}
          onClick={() => canNext && setStart(start + 3)}
          disabled={!canNext}
          aria-label="Sản phẩm tiếp theo"
        >
          &rarr;
        </button>
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  )
}
