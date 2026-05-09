'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoCheckmarkCircle } from 'react-icons/io5'

interface CartToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

const CartToast = ({ message, isVisible, onClose }: CartToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed bottom-8 left-1/2 z-[200] flex -translate-x-1/2 items-center gap-3 rounded-full bg-slate-900 px-6 py-3 text-white shadow-2xl shadow-emerald-950/20"
        >
          <IoCheckmarkCircle className="text-emerald-400" size={20} />
          <span className="text-sm font-semibold">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CartToast
