'use client'

import { useEffect, useState } from 'react'
import { FiUsers, FiSearch, FiEdit2, FiTrash2, FiRefreshCw, FiUserCheck, FiUserX, FiShield } from 'react-icons/fi'

interface UserMetadata {
  id: string
  name?: string
  email?: string
  phone?: string
  role?: 'admin' | 'customer'
  createdAt?: string
}

const UserList = () => {
  const [users, setUsers] = useState<UserMetadata[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  const fetchUsers = async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch('/api/admin/users')
      if (!response.ok) throw new Error('Không thể tải danh sách người dùng')
      const data = await response.json()
      setUsers(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleUpdateRole = async (userId: string, newRole: 'admin' | 'customer') => {
    setIsUpdating(userId)
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole }),
      })
      if (!response.ok) throw new Error('Không thể cập nhật quyền')
      
      setUsers(current => current.map(u => u.id === userId ? { ...u, role: newRole } : u))
    } catch (err: any) {
      alert(err.message)
    } finally {
      setIsUpdating(null)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) return

    try {
      const response = await fetch(`/api/admin/users?userId=${userId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Không thể xóa người dùng')
      
      setUsers(current => current.filter(u => u.id !== userId))
    } catch (err: any) {
      alert(err.message)
    }
  }

  const filteredUsers = users.filter(user => 
    (user.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
     user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
     user.phone?.includes(searchQuery))
  )

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    customers: users.filter(u => u.role === 'customer').length,
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">Cộng đồng</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-950">Quản lý người dùng</h1>
          <p className="mt-1 text-sm text-slate-500">Xem danh sách khách hàng và quản lý quyền quản trị.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchUsers}
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:border-emerald-300 hover:text-emerald-800"
          >
            <FiRefreshCw className={isLoading ? 'animate-spin' : ''} />
            Tải lại
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Tổng người dùng</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{stats.total}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Quản trị viên</p>
          <p className="mt-2 text-2xl font-bold text-emerald-700">{stats.admins}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Khách hàng</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{stats.customers}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-base font-semibold text-slate-950">Danh sách tài khoản</h2>
          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm tên, email, sđt..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:border-emerald-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 text-sm border-b border-red-100">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex min-h-64 items-center justify-center text-sm text-slate-500">Đang tải dữ liệu...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
              <FiUsers className="text-2xl" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-950">Không tìm thấy người dùng</h3>
            <p className="mt-2 max-w-sm text-sm text-slate-500">Thử thay đổi từ khóa tìm kiếm của bạn.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Người dùng</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Liên hệ</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Vai trò</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Ngày tham gia</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 font-bold uppercase">
                          {user.name?.[0] || 'U'}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-950">{user.name || 'N/A'}</p>
                          <p className="text-xs text-slate-500">{user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm text-slate-600">
                        <p>{user.email}</p>
                        <p className="mt-0.5">{user.phone || 'Chưa cập nhật'}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        user.role === 'admin' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-slate-100 text-slate-600'
                      }`}>
                        {user.role === 'admin' ? <FiShield size={12} /> : null}
                        {user.role === 'admin' ? 'Quản trị' : 'Khách hàng'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {user.role === 'admin' ? (
                          <button
                            onClick={() => handleUpdateRole(user.id, 'customer')}
                            disabled={isUpdating === user.id}
                            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Gỡ quyền Admin"
                          >
                            <FiUserX />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUpdateRole(user.id, 'admin')}
                            disabled={isUpdating === user.id}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Cấp quyền Admin"
                          >
                            <FiUserCheck />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa tài khoản"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserList
