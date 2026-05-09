"use client";

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'
import CartDrawer from './CartDrawer'

const Header = () => {
  const router = useRouter()
  const { totalQuantity, isMounted } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <>
      <header className="fixed left-0 top-0 z-30 w-full border-b border-stone-200 bg-[#fbfaf5]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-emerald-700 text-sm font-bold text-white">
              BT
            </span>
            <span className="leading-tight">
              <span className="block text-base font-semibold text-slate-950">Ba Tuyen Shop</span>
              <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-emerald-700 sm:block">
                Cửa hàng tổng hợp
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <Link href="#quan-ao" className="hover:text-emerald-700">Quần áo</Link>
            <Link href="#thuc-an" className="hover:text-emerald-700">Thức ăn</Link>
            <Link href="#phan-bon" className="hover:text-emerald-700">Phân bón</Link>
          </nav>

          <div className="flex items-center gap-2">
            <button className="flex size-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-white hover:text-emerald-700" aria-label="Tìm kiếm">
              <FiSearch className="text-xl" />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex size-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-white hover:text-emerald-700" 
              aria-label="Giỏ hàng"
            >
              <FiShoppingCart className="text-xl" />
              {isMounted && totalQuantity > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white ring-2 ring-[#fbfaf5]">
                  {totalQuantity}
                </span>
              )}
            </button>
            <button
              className="flex size-10 items-center justify-center rounded-lg bg-slate-900 text-white transition hover:bg-emerald-800"
              aria-label="Quản trị"
              onClick={() => router.push('/admin')}
            >
              <FiUser className="text-xl" />
            </button>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default Header
