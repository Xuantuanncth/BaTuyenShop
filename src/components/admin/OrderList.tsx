'use client'

import React, { useEffect, useState } from 'react'
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { getDb } from '@/utils/firebaseConfig'
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiTrash2, FiUser, FiPhone, FiMapPin, FiShoppingBag } from 'react-icons/fi'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface Order {
  id: string
  customer: {
    name: string
    phone: string
    address: string
    note?: string
  }
  items: OrderItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: any
}

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(getDb(), 'orders'), orderBy('createdAt', 'desc'))
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Order[]
      setOrders(orderData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(getDb(), 'orders', orderId), {
        status: newStatus,
      })
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const deleteOrder = async (orderId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) return
    try {
      await deleteDoc(doc(getDb(), 'orders', orderId))
    } catch (error) {
      console.error('Error deleting order:', error)
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'shipped': return 'bg-indigo-100 text-indigo-700 border-indigo-200'
      case 'delivered': return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'cancelled': return 'bg-slate-100 text-slate-700 border-slate-200'
      default: return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý'
      case 'processing': return 'Đang đóng gói'
      case 'shipped': return 'Đang giao'
      case 'delivered': return 'Đã giao'
      case 'cancelled': return 'Đã hủy'
      default: return status
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {orders.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-slate-50 text-slate-300">
            <FiPackage size={32} />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">Chưa có đơn hàng nào</h3>
          <p className="mt-1 text-sm text-slate-500">Các đơn đặt hàng mới từ khách sẽ xuất hiện tại đây.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
              {/* Order Header */}
              <div className="flex flex-col border-b border-slate-100 bg-slate-50/50 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className={`flex size-12 items-center justify-center rounded-xl bg-white shadow-sm border ${getStatusStyle(order.status).split(' ')[1].replace('text-', 'border-')}`}>
                    <FiShoppingBag className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Đơn hàng #{order.id.slice(-6).toUpperCase()}</h3>
                    <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                      <FiClock /> {order.createdAt?.toDate().toLocaleString('vi-VN')}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-0">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusStyle(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="pending">Chờ xử lý</option>
                    <option value="processing">Đang đóng gói</option>
                    <option value="shipped">Đang giao</option>
                    <option value="delivered">Đã giao</option>
                    <option value="cancelled">Hủy đơn</option>
                  </select>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:border-red-200 hover:text-red-500 transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Order Content */}
              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr]">
                {/* Items & Summary */}
                <div className="p-5 border-b md:border-b-0 md:border-r border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Sản phẩm</h4>
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-3">
                          <span className="flex size-6 items-center justify-center rounded bg-slate-100 text-[10px] font-bold text-slate-600">
                            {item.quantity}x
                          </span>
                          <span className="text-sm font-medium text-slate-700 line-clamp-1">{item.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-900">
                          {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between rounded-xl bg-emerald-50/50 p-4 border border-emerald-100">
                    <span className="text-sm font-bold text-emerald-900">Tổng thanh toán</span>
                    <span className="text-lg font-extrabold text-emerald-800">
                      {order.total.toLocaleString('vi-VN')} VND
                    </span>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="p-5 bg-slate-50/30">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Khách hàng</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <FiUser className="mt-0.5 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-tight">Họ và tên</p>
                        <p className="text-sm font-bold text-slate-900">{order.customer.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FiPhone className="mt-0.5 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-tight">Điện thoại</p>
                        <p className="text-sm font-bold text-slate-900">{order.customer.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FiMapPin className="mt-0.5 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-tight">Địa chỉ</p>
                        <p className="text-sm font-medium text-slate-700 leading-relaxed">{order.customer.address}</p>
                      </div>
                    </div>
                    {order.customer.note && (
                      <div className="mt-2 rounded-lg bg-white border border-slate-100 p-3">
                        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Ghi chú</p>
                        <p className="mt-1 text-xs text-slate-600 italic">"{order.customer.note}"</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderList
