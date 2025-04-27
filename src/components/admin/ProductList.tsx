import { useState, useRef } from 'react'
import { db } from '../../utils/firebaseConfig' // Import Firestore instance
import { collection, addDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

interface Product {
  id: number
  name: string
  description: string
  price: number
  quantity: number
  image?: string
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Áo Thun Nông Dân',
    description: 'Thoáng mát, thích hợp làm việc ngoài trời.',
    price: 100000,
    quantity: 50,
  },
  {
    id: 2,
    name: 'Thức Ăn Gia Cầm 25kg',
    description: 'Cung cấp đầy đủ dinh dưỡng cho gia cầm.',
    price: 250000,
    quantity: 30,
  },
]

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const fileInputRef = useRef<HTMLInputElement | null>(null) // Create a ref for the file input
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    quantity: 0,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click() // Trigger the hidden file input
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files?.[0] || null) // Set the selected file
  }

  const handleAdd = () => {
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    try {
      let imageUrl = ''
      if (imageFile) {
        const storage = getStorage()
        const storageRef = ref(storage, `products/${imageFile.name}`)
        await uploadBytes(storageRef, imageFile)
        imageUrl = await getDownloadURL(storageRef)
      }

      const productData = { ...newProduct, image: imageUrl }
      const docRef = await addDoc(collection(db, 'products'), productData)

      setProducts([...products, { ...productData, id: docRef.id }])
      setIsModalOpen(false)
      setNewProduct({ id: 0, name: '', description: '', price: 0, quantity: 0 })
      setImageFile(null)
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>
      <button onClick={handleAdd} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">
        Thêm sản phẩm
      </button>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Tên sản phẩm</th>
            <th className="py-2 px-4 border-b">Mô tả</th>
            <th className="py-2 px-4 border-b">Giá</th>
            <th className="py-2 px-4 border-b">Số lượng</th>
            <th className="py-2 px-4 border-b">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">{product.price.toLocaleString()}₫</td>
              <td className="py-2 px-4 border-b">{product.quantity}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Thêm sản phẩm mới</h2>
            <input
              type="text"
              placeholder="Tên sản phẩm"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              placeholder="Mô tả"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Giá"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Số lượng"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
              className="w-full mb-2 p-2 border rounded"
            />
            <button
              onClick={handleFileButtonClick}
              className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Thêm hình ảnh
            </button>
            <input
              type="file"
              ref={fileInputRef} // Attach the ref to the input
              onChange={handleFileChange}
              className="hidden" // Hide the file input
            />
            {imageFile && <p className="text-gray-600">Đã chọn: {imageFile.name}</p>}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductList
