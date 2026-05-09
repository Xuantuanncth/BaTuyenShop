"use client";

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiSearch, FiShoppingCart, FiUser, FiLogOut, FiShield } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import CartDrawer from './CartDrawer'

const Header = () => {
  const router = useRouter()
  const { totalQuantity, isMounted } = useCart()
  const { user, metadata, isAdmin, logout } = useAuth()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed left-0 top-0 z-30 w-full border-b border-stone-200 bg-[#fbfaf5]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-emerald-700 text-sm font-bold text-white">
              BT
            </span>
            <span className="leading-tight">
              <span className="block text-base font-semibold text-slate-950">Bà Tuyến Shop</span>
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
            <div className="relative">
              <button
                className={`group relative flex size-10 items-center justify-center rounded-lg transition ${
                  isAdmin ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-200' : 'bg-slate-900 text-white'
                } hover:bg-emerald-800`}
                aria-label="Tài khoản"
                onClick={() => user ? setIsUserMenuOpen(!isUserMenuOpen) : router.push('/login')}
              >
                <FiUser className="text-xl" />
                {isAdmin && (
                  <div className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-amber-400 text-[10px] text-slate-900 shadow-sm ring-2 ring-[#fbfaf5]">
                    <FiShield size={10} />
                  </div>
                )}
              </button>

              {isUserMenuOpen && user && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2 flex flex-col gap-0.5">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {user.displayName || 'Khách hàng'}
                    </div>
                    {isAdmin && (
                      <div className="inline-flex w-fit items-center gap-1 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-emerald-800">
                        <FiShield size={10} /> Quản trị viên
                      </div>
                    )}
                  </div>
                  {isAdmin ? (
                    <button
                      onClick={() => {
                        router.push('/admin')
                        setIsUserMenuOpen(false)
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    >
                      <FiUser /> Admin Panel
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        router.push('/profile')
                        setIsUserMenuOpen(false)
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    >
                      <FiUser /> Thiết lập hồ sơ
                    </button>
                  )}
                  <hr className="my-1 border-slate-100" />
                  <button
                    onClick={() => {
                      logout()
                      setIsUserMenuOpen(false)
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <FiLogOut /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default Header
