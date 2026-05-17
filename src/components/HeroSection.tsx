'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiCamera, FiArrowRight, FiCheckCircle, FiPackage, FiTruck, FiImage, FiAward, FiStar, FiUsers, FiPhone, FiMapPin, FiClock, FiExternalLink } from 'react-icons/fi'

interface HeroSectionProps {
  isAdmin?: boolean
  initialData?: any
}

// --- Sub-components (SRS V3.0) ---

const HeroBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mb-8"
  >
    <div className="inline-flex items-center gap-3 rounded-full border border-emerald-100 bg-emerald-50/50 px-5 py-2.5 text-sm font-bold tracking-wide text-emerald-800 shadow-sm backdrop-blur-sm">
      <FiAward className="text-emerald-600" />
      <span className="uppercase tracking-widest text-[10px] sm:text-xs">Hàng thiết yếu cho gia đình & nông trại</span>
    </div>
  </motion.div>
)

const HeroHeadline = () => (
  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="text-4xl font-black leading-[1.15] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl xl:text-7xl"
  >
    Mọi thứ bạn cần cho <br />
    <span className="relative inline-block">
      cuộc sống
      <svg className="absolute -bottom-1 left-0 w-full sm:-bottom-2" viewBox="0 0 358 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9C118.5 3 239.5 3 355 9" stroke="#059669" strokeWidth="6" strokeLinecap="round" />
      </svg>
    </span>
    <br />
    <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
      nông thôn hiện đại
    </span>
  </motion.h1>
)

const HeroDescription = () => (
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
    className="mt-8 max-w-xl text-base leading-relaxed text-slate-600 sm:mt-10 sm:text-xl"
  >
    Quần áo, vật tư nông nghiệp và sản phẩm thiết yếu được tuyển chọn với giá hợp lý và giao hàng nhanh toàn quốc.
  </motion.p>
)

const HeroCTAGroup = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.6 }}
    className="mt-10 flex flex-wrap gap-4 sm:mt-12 sm:gap-5"
  >
    <Link
      href="#products"
      className="group relative inline-flex h-14 sm:h-16 items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl bg-emerald-700 px-8 sm:px-10 text-base sm:text-lg font-bold text-white shadow-2xl shadow-emerald-900/30 transition-all hover:bg-emerald-800 active:scale-95"
    >
      <span className="relative z-10 flex items-center gap-2">
        Khám phá sản phẩm <FiArrowRight className="transition-transform group-hover:translate-x-1" />
      </span>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
    <Link
      href="#categories"
      className="inline-flex h-14 sm:h-16 items-center justify-center rounded-xl sm:rounded-2xl border-2 border-slate-200 bg-white px-8 sm:px-10 text-base sm:text-lg font-bold text-slate-900 transition-all hover:border-emerald-300 hover:text-emerald-700 active:scale-95 shadow-sm"
    >
      Xem danh mục
    </Link>
  </motion.div>
)

const HeroContactCard = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
    className="relative z-20 w-full overflow-hidden rounded-[2rem] bg-white/80 p-6 shadow-2xl backdrop-blur-xl border border-white/50 sm:p-8"
  >
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <FiPhone className="text-xl" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Liên hệ ngay</p>
          <a href="tel:0912345678" className="text-xl font-black text-slate-950 hover:text-emerald-700 transition-colors">0369593958</a>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <FiMapPin className="text-xl" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Địa chỉ cửa hàng</p>
          <p className="text-sm font-semibold text-slate-700 leading-relaxed mt-1">Số 217 Đường 07 Đại Đồng, Thắng Lợi, Thanh Hóa, Việt Nam</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <FiClock className="text-xl" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Giờ mở cửa</p>
          <p className="text-sm font-semibold text-slate-700">7:00 - 21:00 (Hàng ngày)</p>
        </div>
      </div>

      <Link
        href="https://www.google.com/maps/place/C%E1%BB%ADa+h%C3%A0ng+b%C3%A0+Tuy%E1%BA%BFn/@19.6782413,105.6854591,1023m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3136fdac0d2523b7:0x2831f9614a30d75a!8m2!3d19.6782363!4d105.688034!16s%2Fg%2F11lqlc1zs6?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
        target="_blank"
        className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-4 text-sm font-bold text-white transition-all hover:bg-emerald-700 active:scale-95"
      >
        Dẫn đường trên Google Maps <FiExternalLink />
      </Link>
    </div>
  </motion.div>
)

const HeroMap = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay: 0.6 }}
    className="relative h-[300px] w-full overflow-hidden rounded-[2rem] border-4 border-white shadow-xl sm:h-[400px]"
  >
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3756.8069151662107!2d105.68545907594623!3d19.67824133278902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3136fdac0d2523b7%3A0x2831f9614a30d75a!2zQ-G7rWEgaMOgbmcgYsOgIFR1eeG6v24!5e0!3m2!1sen!2s!4v1778904967756!5m2!1sen!2s"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="w-full h-full"
    />
  </motion.div>
)

const HeroSection = ({ isAdmin }: HeroSectionProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#fbfaf5] pt-24 lg:pt-32 pb-20" suppressHydrationWarning>
      {/* Background Blobs */}
      <motion.div
        animate={{ x: mousePosition.x * 40, y: mousePosition.y * 40 }}
        className="absolute -top-24 -left-24 size-[300px] sm:size-[500px] rounded-full bg-emerald-100/40 blur-[80px] sm:blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ x: mousePosition.x * -60, y: mousePosition.y * -60 }}
        className="absolute top-1/2 -right-24 size-[400px] sm:size-[600px] rounded-full bg-amber-100/30 blur-[100px] sm:blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left Content Area */}
          <div className="flex flex-col items-start text-left">
            <HeroBadge />
            <HeroHeadline />
            <HeroDescription />
            <HeroCTAGroup />

            {/* Stats Items */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-16 grid grid-cols-3 gap-4 w-full border-t border-slate-200/60 pt-10 sm:gap-8"
            >
              {[
                { icon: FiUsers, title: '5000+', desc: 'Khách hàng' },
                { icon: FiTruck, title: 'Toàn quốc', desc: 'Giao hàng nhanh' },
                { icon: FiStar, title: '4.8/5', desc: 'Đánh giá hài lòng' },
              ].map((item, idx) => (
                <div key={idx} className="group flex flex-col gap-2 sm:gap-3">
                  <div className="flex size-8 sm:size-10 items-center justify-center rounded-lg sm:rounded-xl bg-emerald-50 text-emerald-600">
                    <item.icon className="text-lg sm:text-xl" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-bold text-slate-900">{item.title}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Visual Area - Contact & Map */}
          <div className="flex flex-col gap-8">
            <HeroContactCard />
            <HeroMap />
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection
