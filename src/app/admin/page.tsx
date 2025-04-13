// src/app/admin/page.tsx
'use client';
import { useState } from 'react'
import ProductList from '@/components/admin/ProductList'
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const [selectedMenu, setSelectedMenu] = useState('products')
    const router = useRouter();

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg p-6">
                <div>

                    <h2 className="text-2xl font-bold mb-6">Quản Lý</h2>
                    <ul className="space-y-4">
                        <li>
                            <button onClick={() => setSelectedMenu('products')} className="text-left w-full hover:text-blue-600">
                                Quản lý sản phẩm
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setSelectedMenu('orders')} className="text-left w-full hover:text-blue-600">
                                Quản lý đơn hàng
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setSelectedMenu('users')} className="text-left w-full hover:text-blue-600">
                                Quản lý người dùng
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setSelectedMenu('reports')} className="text-left w-full hover:text-blue-600">
                                Thống kê và báo cáo
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setSelectedMenu('settings')} className="text-left w-full hover:text-blue-600">
                                Cấu hình
                            </button>
                        </li>
                    </ul>
                </div>
                <button onClick={() => router.push('/')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-auto" // Changed mt-6 to mt-auto
                    style={{ position: 'absolute', bottom: '16px', left: '16px' }} // Added absolute positioning
                >
                    Trở lại
                </button>
            </aside>

            {/* Main content */}
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
