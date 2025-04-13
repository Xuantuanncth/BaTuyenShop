export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen bg-gray-100">
        <aside className="w-64 bg-white shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <ul className="space-y-4 text-gray-700">
            <li><a href="/admin/products" className="hover:underline">Quản lý sản phẩm</a></li>
            <li><a href="/admin/orders" className="hover:underline">Quản lý đơn hàng</a></li>
            <li><a href="/admin/users" className="hover:underline">Quản lý người dùng</a></li>
            <li><a href="/admin/reports" className="hover:underline">Thống kê & báo cáo</a></li>
            <li><a href="/admin/settings" className="hover:underline">Cấu hình</a></li>
          </ul>
        </aside>
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    )
  }
  