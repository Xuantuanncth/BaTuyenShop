import { useState, useEffect, useRef } from 'react'
import { db } from '../../utils/firebaseConfig' // Import Firestore instance
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'

interface Product {
  id: string // Use string since Firestore document IDs are strings
  name: string
  description: string
  price: number
  category: string
  quantity: number
  image?: string
  public_id?: string // Add public_id to store Cloudinary image ID
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]) // Initialize with an empty array
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newProduct, setNewProduct] = useState<Product>({
    id: '',
    name: '',
    description: '',
    category: 'quan-ao', // Default category
    price: 0,
    quantity: 0,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)

  // Fetch all products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'))
        const fetchedProducts: Product[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[]
        setProducts(fetchedProducts)
        console.log(`Fetched ${fetchedProducts.length} products from Firebase.`)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files?.[0] || null)
  }

  const handleSave = async () => {
    try {
      let imageUrl = ''
      let publicId = ''
      if (imageFile) {
        const reader = new FileReader()
        reader.readAsDataURL(imageFile)
        const base64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = (error) => reject(error)
        })

        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ file: base64 }),
        })

        const data = await response.json()
        if (response.ok) {
          console.log('Image uploaded successfully:', data)
          imageUrl = data.url
          publicId = data.public_id // Extract public_id from the response
        } else {
          console.error('Error uploading image:', data.error)
          throw new Error(data.error || 'Failed to upload image')
        }
      }

      const productData = { ...newProduct, image: imageUrl, public_id: publicId }
      const docRef = await addDoc(collection(db, 'products'), productData)

      setProducts([...products, { ...productData, id: docRef.id }])
      setIsModalOpen(false)
      setNewProduct({ id: '', name: '', description: '', category: 'quan-ao', price: 0, quantity: 0 })
      setImageFile(null)
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  const handleDelete = async (productId: string, publicId?: string) => {
    try {
      // Delete the product document from Firebase
      console.log(`Deleted product with ID: ${productId} from Firebase.`)
      console.log(`Deleted product with ID: ${publicId} from Firebase.`)
      await deleteDoc(doc(db, 'products', productId))

      // If the product has an associated image, delete it from Cloudinary
      if (publicId) {
        const response = await fetch('/api/deleteImage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_id: publicId }),
        })

        const data = await response.json()
        if (response.ok) {
          console.log(`Deleted image with public_id: ${publicId} from Cloudinary.`)
        } else {
          console.error('Error deleting image from Cloudinary:', data.error)
        }
      }

      // Remove the product from the local state
      setProducts(products.filter(product => product.id !== productId))
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>
      <button onClick={() => setIsModalOpen(true)} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">
        Thêm sản phẩm
      </button>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Tên sản phẩm</th>
            <th className="py-2 px-4 border-b">Mô tả</th>
            <th className="py-2 px-4 border-b">Giá</th>
            <th className="py-2 px-4 border-b">Số lượng</th>
            <th className="py-2 px-4 border-b">Hình ảnh</th>
            <th className="py-2 px-4 border-b">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">{product.price.toLocaleString()}₫</td>
              <td className="py-2 px-4 border-b">{product.quantity}</td>
              <td className="py-2 px-4 border-b">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                ) : (
                  'No Image'
                )}
              </td>
              <td className="py-2 px-4 border-b">
                <button className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded">Sửa</button>
                <button
                  onClick={() => handleDelete(product.id, product.public_id)}
                  className="px-2 py-1 mt-2 bg-red-600 text-white rounded"
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
              onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              placeholder="Mô tả"
              value={newProduct.description}
              onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <select
              value={newProduct.category}
              onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            >
              <option value="quan-ao">Quần áo</option>
              <option value="thuc-an">Thức ăn chăn nuôi</option>
              <option value="phan-bon">Phân bón</option>
            </select>
            Giá
            <input
              type="number"
              placeholder="Giá"
              value={newProduct.price}
              onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
              className="w-full mb-2 p-2 border rounded"
            />
            Số lượng
            <input
              type="number"
              placeholder="Số lượng"
              value={newProduct.quantity}
              onChange={e => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
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
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            {imageFile && <p className="text-gray-600">Đã chọn: {imageFile.name}</p>}
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded">
                Hủy
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">
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
