'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoCheckmarkCircle, IoArrowBack } from 'react-icons/io5'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { getDb } from '@/utils/firebaseConfig'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'

interface CheckoutFormProps {
  onBack: () => void
  onSuccess: () => void
}

const CheckoutForm = ({ onBack, onSuccess }: CheckoutFormProps) => {
  const { items, totalAmount, clearCart } = useCart()
  const { user, metadata } = useAuth()
  const [loading, setLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
    // Honeypot field
    website: '', 
  })

  useEffect(() => {
    if (metadata) {
      setFormData(prev => ({
        ...prev,
        name: metadata.name || prev.name,
        phone: metadata.phone || prev.phone,
        address: metadata.address || prev.address,
      }))
    }
  }, [metadata])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Honeypot check: If 'website' is filled, it's likely a bot
    if (formData.website) {
      console.warn('Bot detected via honeypot.')
      setLoading(false)
      clearCart()
      setIsSubmitted(true)
      return
    }

    // Validation
    if (!formData.name || !formData.phone || !formData.address) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc.')
      setLoading(false)
      return
    }

    try {
      const orderData = {
        userId: user?.uid || 'guest',
        customer: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          note: formData.note,
        },
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          category: item.category
        })),
        total: totalAmount,
        status: 'pending',
        createdAt: serverTimestamp(),
      }

      await addDoc(collection(getDb(), 'orders'), orderData)
      
      clearCart()
      setIsSubmitted(true)
    } catch (err) {
      console.error('Error placing order:', err)
      setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.')
    } finally {
      setLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <IoCheckmarkCircle size={64} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Đặt hàng thành công!</h3>
        <p className="mt-4 max-w-xs text-base leading-relaxed text-slate-500">
          Cảm ơn quý khách đã tin tưởng lựa chọn Ba Tuyen Shop. Chúng tôi sẽ liên hệ xác nhận đơn hàng trong thời gian sớm nhất.
        </p>
        <button
          onClick={onSuccess}
          className="mt-10 flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-8 text-sm font-bold text-white transition-all hover:bg-emerald-800 active:scale-[0.98]"
        >
          Tiếp tục mua sắm
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Honeypot field - Hidden from users */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">Họ và tên *</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Nguyễn Văn A"
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">Số điện thoại *</label>
        <input
          type="tel"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="0912xxx..."
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">Địa chỉ nhận hàng *</label>
        <textarea
          name="address"
          required
          rows={3}
          value={formData.address}
          onChange={handleChange}
          placeholder="Số nhà, tên đường, xã/phường..."
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">Ghi chú (tùy chọn)</label>
        <textarea
          name="note"
          rows={2}
          value={formData.note}
          onChange={handleChange}
          placeholder="Giao hàng vào giờ hành chính..."
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition-all resize-none"
        />
      </div>

      {error && <p className="text-sm font-medium text-red-500">{error}</p>}

      <div className="mt-4 pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium text-slate-500">Tổng thanh toán</span>
          <span className="text-xl font-bold text-emerald-800">
            {totalAmount.toLocaleString('vi-VN')} VND
          </span>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="flex h-14 w-full items-center justify-center rounded-xl bg-emerald-700 text-base font-bold text-white shadow-lg shadow-emerald-900/10 transition-all hover:bg-emerald-800 disabled:opacity-50 active:scale-[0.98]"
        >
          {loading ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
        </button>
      </div>
    </form>
  )
}

export default CheckoutForm
