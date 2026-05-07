'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProductList from '@/components/admin/ProductList'

export default function AdminShell() {
  const [selectedMenu, setSelectedMenu] = useState('products')
  const router = useRouter()

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="relative w-64 bg-white p-6 shadow-lg">
        <div>
          <h2 className="mb-6 text-2xl font-bold">Quản lý</h2>
          <ul className="space-y-4">
            <li>
              <button onClick={() => setSelectedMenu('products')} className="w-full text-left hover:text-blue-600">
                Quản lý sản phẩm
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedMenu('orders')} className="w-full text-left hover:text-blue-600">
                Quản lý đơn hàng
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedMenu('users')} className="w-full text-left hover:text-blue-600">
                Quản lý người dùng
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedMenu('reports')} className="w-full text-left hover:text-blue-600">
                Thống kê và báo cáo
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedMenu('settings')} className="w-full text-left hover:text-blue-600">
                Cấu hình
              </button>
            </li>
          </ul>
        </div>
        <button
          onClick={() => router.push('/')}
          className="absolute bottom-4 left-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Trở lại
        </button>
      </aside>

      <main className="flex-1 p-10">
        {selectedMenu === 'products' && <ProductList />}
        {selectedMenu === 'orders' && <div>Quản lý đơn hàng</div>}
        {selectedMenu === 'users' && <div>Quản lý người dùng</div>}
        {selectedMenu === 'reports' && <div>Thống kê và báo cáo</div>}
        {selectedMenu === 'settings' && <div>Cấu hình</div>}
      </main>
    </div>
  )
}
