'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { collection, getDocs, query, where } from 'firebase/firestore'
import ProductModal from './ProductModal'
import ProductCard from './ProductCard'
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

      <div className="grid min-h-[360px] grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {visible.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onOpenDetails={(p) => setSelectedProduct(p)} 
          />
        ))}
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  )
}
