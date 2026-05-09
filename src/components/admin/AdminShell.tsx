'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiBarChart2, FiBox, FiChevronLeft, FiHome, FiSettings, FiShoppingBag, FiUsers } from 'react-icons/fi'
import ProductList from '@/components/admin/ProductList'
import OrderList from '@/components/admin/OrderList'
import UserList from '@/components/admin/UserList'

const menuItems = [
  {
    key: 'products',
    label: 'Sản phẩm',
    description: 'Kho hàng và giá bán',
    icon: FiBox,
  },
  {
    key: 'orders',
    label: 'Đơn hàng',
    description: 'Theo dõi mua bán',
    icon: FiShoppingBag,
  },
  {
    key: 'users',
    label: 'Người dùng',
    description: 'Tài khoản và quyền',
    icon: FiUsers,
  },
  {
    key: 'reports',
    label: 'Báo cáo',
    description: 'Thống kê hoạt động',
    icon: FiBarChart2,
  },
  {
    key: 'settings',
    label: 'Cấu hình',
    description: 'Thiết lập cửa hàng',
    icon: FiSettings,
  },
]

function PlaceholderPanel({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex min-h-[520px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
      <div className="max-w-sm">
        <div className="mx-auto flex size-14 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
          <FiSettings className="text-2xl" />
        </div>
        <h2 className="mt-5 text-xl font-semibold text-slate-950">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </div>
  )
}

export default function AdminShell() {
  const [selectedMenu, setSelectedMenu] = useState('products')
  const router = useRouter()

  const activeItem = useMemo(
    () => menuItems.find(item => item.key === selectedMenu) || menuItems[0],
    [selectedMenu],
  )

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-slate-900 lg:flex" suppressHydrationWarning>
      <aside className="border-b border-slate-200 bg-slate-950 text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-80 lg:flex-col lg:border-b-0 lg:border-r lg:border-slate-800">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <button onClick={() => router.push('/')} className="flex items-center gap-3 text-left">
            <span className="flex size-11 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold">BT</span>
            <span>
              <span className="block text-base font-semibold">Ba Tuyen Shop</span>
              <span className="text-xs uppercase tracking-[0.18em] text-emerald-300">Admin console</span>
            </span>
          </button>
        </div>

        <div className="px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Quản trị</p>
          <nav className="mt-4 grid gap-2">
            {menuItems.map(item => {
              const Icon = item.icon
              const isActive = selectedMenu === item.key

              return (
                <button
                  key={item.key}
                  onClick={() => setSelectedMenu(item.key)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-left transition ${
                    isActive
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className={`flex size-10 items-center justify-center rounded-lg ${isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-white/10 text-slate-300'}`}>
                    <Icon />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{item.label}</span>
                    <span className={`mt-0.5 block text-xs ${isActive ? 'text-slate-500' : 'text-slate-500'}`}>{item.description}</span>
                  </span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="mt-auto hidden border-t border-white/10 p-5 lg:block">
          <button
            onClick={() => router.push('/')}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 text-sm font-semibold text-slate-200 hover:bg-white/10"
          >
            <FiChevronLeft />
            Về trang bán hàng
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-[#f6f4ef]/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Bảng điều khiển</p>
              <h1 className="mt-1 text-2xl font-semibold text-slate-950">{activeItem.label}</h1>
              <p className="mt-1 text-sm text-slate-500">{activeItem.description}</p>
            </div>
            <button
              onClick={() => router.push('/')}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm hover:border-emerald-300 hover:text-emerald-800 lg:hidden"
            >
              <FiHome />
              Trang bán hàng
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {selectedMenu === 'products' && <ProductList />}
          {selectedMenu === 'orders' && <OrderList />}
          {selectedMenu === 'users' && <UserList />}
          {selectedMenu === 'reports' && (
            <PlaceholderPanel title="Thống kê và báo cáo" description="Khu vực này sẽ tổng hợp doanh thu, sản phẩm bán chạy và dữ liệu vận hành." />
          )}
          {selectedMenu === 'settings' && (
            <PlaceholderPanel title="Cấu hình cửa hàng" description="Khu vực này sẽ quản lý thông tin cửa hàng, liên hệ và các thiết lập hệ thống." />
          )}
        </main>
      </div>
    </div>
  )
}
