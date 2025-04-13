// components/ProductModal.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  quantity?: number;
  price?: number;
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-lg p-6 w-full max-w-md"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img src={product.image} alt={product.name} className="w-full h-60 object-cover rounded" />
          <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
          <p className="mt-2 text-gray-600">{product.description}</p>
          {product.quantity && <p className="mt-2">Số lượng: {product.quantity}</p>}
          {product.price && <p className="mt-2">Giá: {product.price}₫</p>}
          <button
            onClick={onClose}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Đóng
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
