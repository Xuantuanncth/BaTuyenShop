// components/ProductModal.tsx
import React from 'react';

interface Product {
  id: string; // Firestore document IDs are strings
  name: string;
  description: string;
  image: string;
  category: string;
  quantity?: number;
  price?: number;
}

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  if (!product) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      role="dialog" // Identify this as a dialog
      aria-modal="true" // Indicate that this is a modal dialog
      aria-labelledby="modal-title" // Link to the title element
      aria-describedby="modal-description" // Link to the description element
    >
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 id="modal-title" className="text-xl font-bold mb-4">{product.name}</h2>
        <img src={product.image} alt={product.name} className="w-full h-60 object-cover rounded-xl" />
        <p id="modal-description" className="text-gray-600 mt-4">{product.description}</p>
        <p className="text-blue-700 text-lg font-bold mt-4">Giá: {product.price?.toLocaleString()}₫</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Đóng
        </button>
      </div>
    </div>
  )
}

export default ProductModal
