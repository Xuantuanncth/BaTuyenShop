'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProductModal from './ProductModal'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../utils/firebaseConfig' 

interface Product {
  id: string
  name: string
  description: string
  image: string
  category: string
  quantity?: number
  price?: number
}

export default function ProductSection({ title, category }: { title: string; category: string }) {
  const [start, setStart] = useState(0)
  const [filtered, setFiltered] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, 'products'), where('category', '==', category))
      const querySnapshot = await getDocs(q)
      const products: Product[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[]
      setFiltered(products)
      setStart(0)
    }

    fetchProducts()
  }, [category])

  const visible = filtered.slice(start, start + 3)
  const canPrev = start > 0
  const canNext = start + 3 < filtered.length

  return (
    <section id={category} className="py-16 px-8">
      <h2 className="text-4xl font-bold mb-10 text-center text-blue-700">{title}</h2>

      <div className="flex justify-center gap-10 flex-wrap min-h-[400px]">
        <AnimatePresence mode="wait">
          {visible.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-6 w-96 transition-transform transform hover:scale-105"
            >
              <img src={p.image} alt={p.name} className="w-full h-60 object-cover rounded-xl" />
              <h3 className="text-2xl font-semibold mt-4">{p.name}</h3>
              <p className="text-gray-600 text-base mt-2">{p.description}</p>
              <p className="text-blue-700 text-lg font-bold mt-2">Giá: {p.price}</p>
              <button
                onClick={() => setSelectedProduct(p)}
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Xem chi tiết
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-6 mt-8">
        <button
          className={`px-5 py-3 rounded-full text-lg bg-gray-300 hover:bg-gray-400 ${!canPrev ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => canPrev && setStart(start - 3)}
          disabled={!canPrev}
        >
          ◀
        </button>
        <button
          className={`px-5 py-3 rounded-full text-lg bg-gray-300 hover:bg-gray-400 ${!canNext ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => canNext && setStart(start + 3)}
          disabled={!canNext}
        >
          ▶
        </button>
      </div>
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  )
}