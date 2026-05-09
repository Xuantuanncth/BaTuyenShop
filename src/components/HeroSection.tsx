'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiCamera, FiArrowRight, FiCheckCircle, FiPackage, FiTruck, FiImage } from 'react-icons/fi'
import ModelImage from '../../public/images/landing_pages/model-watch.png'

interface HeroSectionProps {
  isAdmin?: boolean
  initialData?: any
}

const HeroSection = ({ isAdmin, initialData }: HeroSectionProps) => {
  const [thumbUrl, setThumbUrl] = useState<string | null>(initialData?.thumbUrl || null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      // Convert to base64
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        const base64 = reader.result as string

        // 1. Upload to Cloudinary
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ file: base64 }),
        })

        if (!uploadRes.ok) throw new Error('Upload failed')
        const { url } = await uploadRes.json()

        // 2. Save to Settings
        const settingsRes = await fetch('/api/settings?id=hero', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ thumbUrl: url }),
        })

        if (!settingsRes.ok) throw new Error('Failed to save settings')

        setThumbUrl(url)
        alert('Cập nhật ảnh thành công!')
      }
    } catch (error) {
      console.error(error)
      alert('Đã có lỗi xảy ra khi cập nhật ảnh.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <section className="relative overflow-hidden pt-16 lg:pt-20" suppressHydrationWarning>
      {/* Background with premium feel */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#fbfaf5]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#065f46 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}
        />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[680px] max-w-[1440px] grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-bold tracking-wider uppercase text-emerald-800 shadow-sm backdrop-blur-sm">
              <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
              Hàng thiết yếu cho gia đình & nông trại
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl font-bold leading-[1.1] text-slate-950 sm:text-6xl lg:text-7xl"
          >
            Nâng tầm cuộc sống <br />
            <span className="bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
              Nông thôn Việt
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl"
          >
            Bà Tuyến Shop cung cấp quần áo thời trang, thức ăn chăn nuôi chất lượng và phân bón chính hãng. Tất cả trong một điểm đến tin cậy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="#quan-ao"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-8 text-base font-bold text-white shadow-lg shadow-emerald-900/20 transition-all hover:bg-emerald-800 hover:shadow-xl hover:shadow-emerald-900/30 active:scale-95"
            >
              Mua sắm ngay
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#thuc-an"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-slate-200 bg-white/50 px-8 text-base font-bold text-slate-800 shadow-sm backdrop-blur-md transition-all hover:border-emerald-300 hover:bg-white hover:text-emerald-800 active:scale-95"
            >
              Hàng nông nghiệp
            </Link>
          </motion.div>

          {/* Stats / Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-6 border-t border-slate-200 pt-10"
          >
            {[
              { icon: FiCheckCircle, label: 'Chất lượng', sub: 'Đã kiểm định' },
              { icon: FiPackage, label: 'Đa dạng', sub: 'Hơn 1000 mẫu' },
              { icon: FiTruck, label: 'Giao hàng', sub: 'Tận nơi nhanh chóng' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <item.icon className="text-xl text-emerald-600" />
                <div>
                  <p className="font-bold text-slate-900">{item.label}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-tight">{item.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Content - Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative lg:h-[600px]"
        >
          {/* Main Image Container */}
          <div className="group relative h-full min-h-[480px] w-full overflow-hidden rounded-[2rem] border-8 border-white/50 bg-white/30 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:shadow-emerald-900/10">
            {thumbUrl ? (
              <>
                <Image
                  src={thumbUrl}
                  alt="Sản phẩm tại Ba Tuyen Shop"
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
              </>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-emerald-50/50 text-emerald-200">
                <FiImage className="text-8xl opacity-20" />
                <p className="mt-4 text-sm font-medium text-emerald-800/30">Chưa có ảnh nền</p>
              </div>
            )}

            {/* Admin Edit Button */}
            {isAdmin && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-slate-950 shadow-xl transition hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-50"
                >
                  <FiCamera className={isUploading ? 'animate-spin' : ''} />
                  {isUploading ? 'Đang tải...' : 'Thay đổi ảnh nền'}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            )}

            {/* Floating Info Card */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute bottom-6 left-6 right-6 overflow-hidden rounded-2xl bg-white/90 p-5 shadow-xl backdrop-blur-md sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold tracking-wider uppercase text-emerald-700">Bộ sưu tập mới</p>
                  <p className="mt-1 text-base font-medium text-slate-700">
                    Sản phẩm được tuyển chọn kỹ lưỡng, phù hợp với mọi nhu cầu của bạn.
                  </p>
                </div>
                <div className="hidden size-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 sm:flex">
                  <FiPackage className="text-xl" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 -z-10 size-40 rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 -z-10 size-60 rounded-full bg-amber-200/20 blur-3xl" />

          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 100 }}
            className="absolute -top-6 -left-6 hidden rounded-2xl border-4 border-white bg-amber-50 p-4 shadow-xl sm:block"
          >
            <Image
              src={ModelImage}
              alt="Mặt hàng mẫu"
              width={100}
              height={100}
              className="h-24 w-24 object-contain"
            />
            <div className="mt-2 text-center">
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Tin cậy 100%</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
