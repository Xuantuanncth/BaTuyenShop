import { useEffect, useRef, useState } from 'react'
import { FiEdit2, FiImage, FiPackage, FiPlus, FiRefreshCw, FiTrash2, FiUpload, FiX } from 'react-icons/fi'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  quantity: number
  image?: string
  public_id?: string
}

const emptyProduct: Product = {
  id: '',
  name: '',
  description: '',
  category: 'quan-ao',
  price: 0,
  quantity: 0,
}

const categories = [
  { value: 'quan-ao', label: 'Quần áo' },
  { value: 'thuc-an', label: 'Thức ăn chăn nuôi' },
  { value: 'phan-bon', label: 'Phân bón' },
]

const formatPrice = (value: number) => `${Number(value || 0).toLocaleString('vi-VN')} VND`

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newProduct, setNewProduct] = useState<Product>(emptyProduct)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const fetchProducts = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/products')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Không thể tải danh sách sản phẩm')
      }

      setProducts(data.products)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Không thể tải danh sách sản phẩm')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (!imageFile) {
      setImagePreview('')
      return
    }

    const previewUrl = URL.createObjectURL(imageFile)
    setImagePreview(previewUrl)

    return () => URL.revokeObjectURL(previewUrl)
  }, [imageFile])

  const resetForm = () => {
    setNewProduct(emptyProduct)
    setImageFile(null)
    setImagePreview('')
    setError('')
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
    resetForm()
  }

  const openCreateModal = () => {
    setEditingProduct(null)
    resetForm()
    setIsModalOpen(true)
  }

  const openEditModal = (product: Product) => {
    setEditingProduct(product)
    setNewProduct({
      ...product,
      price: Number(product.price || 0),
      quantity: Number(product.quantity || 0),
    })
    setImageFile(null)
    setImagePreview(product.image || '')
    setError('')
    setIsModalOpen(true)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn file ảnh.')
      return
    }

    if (file.size > 4 * 1024 * 1024) {
      setError('Ảnh nên nhỏ hơn 4MB để tải nhanh hơn.')
      return
    }

    setError('')
    setImageFile(file)
  }

  const readImageAsBase64 = async (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    return new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError('')

    try {
      let imageUrl = editingProduct?.image || ''
      let publicId = editingProduct?.public_id || ''

      if (imageFile) {
        const base64 = await readImageAsBase64(imageFile)
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ file: base64 }),
        })
        const uploadData = await uploadResponse.json()

        if (!uploadResponse.ok) {
          throw new Error(uploadData.error || 'Không thể tải ảnh lên')
        }

        imageUrl = uploadData.url
        publicId = uploadData.public_id
      }

      const productData = { ...newProduct, image: imageUrl, public_id: publicId }
      
      const productId = editingProduct?.id || newProduct.id
      if (editingProduct && !productId) {
        throw new Error('Không tìm thấy ID sản phẩm để cập nhật. Vui lòng tải lại trang.')
      }

      const endpoint = editingProduct ? `/api/products?id=${encodeURIComponent(productId)}` : '/api/products'
      const response = await fetch(endpoint, {
        method: editingProduct ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || (editingProduct ? 'Không thể cập nhật sản phẩm' : 'Không thể thêm sản phẩm'))
      }

      setProducts(current => (
        editingProduct
          ? current.map(product => (product.id === editingProduct.id ? data.product : product))
          : [...current, data.product]
      ))
      closeModal()
    } catch (error) {
      setError(error instanceof Error ? error.message : editingProduct ? 'Không thể cập nhật sản phẩm' : 'Không thể thêm sản phẩm')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (productId: string, publicId?: string) => {
    setError('')

    try {
      const deleteResponse = await fetch(`/api/products?id=${encodeURIComponent(productId)}`, {
        method: 'DELETE',
      })

      if (!deleteResponse.ok) {
        const data = await deleteResponse.json()
        throw new Error(data.message || 'Không thể xóa sản phẩm')
      }

      if (publicId) {
        const response = await fetch('/api/deleteImage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_id: publicId }),
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Sản phẩm đã xóa, nhưng ảnh chưa xóa được')
        }
      }

      setProducts(current => current.filter(product => product.id !== productId))
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Không thể xóa sản phẩm')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">Kho sản phẩm</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-950">Quản lý sản phẩm</h1>
          <p className="mt-1 text-sm text-slate-500">Thêm mặt hàng, ảnh, giá và số lượng cho trang bán hàng.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchProducts}
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:border-emerald-300 hover:text-emerald-800"
          >
            <FiRefreshCw />
            Tải lại
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            <FiPlus />
            Thêm sản phẩm
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {categories.map(category => (
          <div key={category.value} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">{category.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {products.filter(product => product.category === category.value).length}
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-950">Danh sách sản phẩm</h2>
        </div>

        {isLoading ? (
          <div className="flex min-h-64 items-center justify-center text-sm text-slate-500">Đang tải sản phẩm...</div>
        ) : products.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
              <FiPackage className="text-2xl" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-950">Chưa có sản phẩm</h3>
            <p className="mt-2 max-w-sm text-sm text-slate-500">Bấm “Thêm sản phẩm” để tạo mặt hàng đầu tiên.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Sản phẩm</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Danh mục</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Giá</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Tồn kho</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((product, index) => (
                  <tr key={product.id || `product-${index}`} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                          ) : (
                            <FiImage className="text-xl text-slate-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-950">{product.name}</p>
                          <p className="mt-1 line-clamp-2 max-w-lg text-sm text-slate-500">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {categories.find(category => category.value === product.category)?.label || product.category}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-emerald-800">{formatPrice(product.price)}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{product.quantity}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => openEditModal(product)}
                        className="mr-1 inline-flex size-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-emerald-700"
                        aria-label={`Sửa ${product.name}`}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.public_id)}
                        className="inline-flex size-10 items-center justify-center rounded-lg text-red-600 hover:bg-red-50"
                        aria-label={`Xóa ${product.name}`}
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">
                  {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {editingProduct ? 'Cập nhật tên, mô tả, giá bán và số lượng.' : 'Điền thông tin cơ bản và tải ảnh đại diện cho sản phẩm.'}
                </p>
              </div>
              <button onClick={closeModal} className="flex size-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100" aria-label="Đóng">
                <FiX />
              </button>
            </div>

            <div className="flex max-h-[calc(92vh-140px)] flex-col overflow-y-auto p-6 md:flex-row md:items-start md:gap-8">
              {/* Left Side: Image Upload */}
              <div className="w-full shrink-0 space-y-4 md:w-72 lg:w-80">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative flex aspect-[4/3] w-full flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 transition-all hover:border-emerald-400 hover:bg-emerald-50/30"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Xem trước sản phẩm" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex flex-col items-center p-4">
                      <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <FiUpload className="text-xl" />
                      </div>
                      <span className="text-sm font-bold text-slate-900">
                        {editingProduct ? 'Đổi ảnh sản phẩm' : 'Tải ảnh lên'}
                      </span>
                      <span className="mt-1 text-xs text-slate-500 text-center">PNG, JPG hoặc WEBP (Max 4MB)</span>
                    </div>
                  )}
                  {imagePreview && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-lg">Thay đổi ảnh</span>
                    </div>
                  )}
                </button>
                <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} className="hidden" />
                
                {imageFile && (
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="truncate text-xs font-medium text-slate-500">Đã chọn tệp:</p>
                    <p className="mt-1 truncate text-xs font-bold text-slate-900">{imageFile.name}</p>
                  </div>
                )}
                
                {editingProduct && !imageFile && imagePreview && (
                  <p className="text-xs leading-relaxed text-slate-500">
                    Sản phẩm hiện đã có ảnh. Bạn có thể tải ảnh mới để thay thế.
                  </p>
                )}
              </div>

              {/* Right Side: Form Fields */}
              <div className="mt-8 flex-1 space-y-5 md:mt-0">
                <label className="block">
                  <span className="text-sm font-bold text-slate-900">Tên sản phẩm</span>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={event => setNewProduct({ ...newProduct, name: event.target.value })}
                    className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    placeholder="Ví dụ: Áo thun cotton"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-slate-900">Mô tả chi tiết</span>
                  <textarea
                    value={newProduct.description}
                    onChange={event => setNewProduct({ ...newProduct, description: event.target.value })}
                    className="mt-2 min-h-[120px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    placeholder="Mô tả chất liệu, công dụng hoặc ghi chú bán hàng..."
                  />
                </label>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-bold text-slate-900">Danh mục</span>
                    <select
                      value={newProduct.category}
                      onChange={event => setNewProduct({ ...newProduct, category: event.target.value })}
                      className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>{category.label}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-sm font-bold text-slate-900">Số lượng tồn kho</span>
                    <input
                      type="number"
                      min={0}
                      value={newProduct.quantity}
                      onChange={event => setNewProduct({ ...newProduct, quantity: Number(event.target.value) })}
                      className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-bold text-slate-900">Giá bán (VND)</span>
                  <div className="relative mt-2">
                    <input
                      type="number"
                      min={0}
                      value={newProduct.price}
                      onChange={event => setNewProduct({ ...newProduct, price: Number(event.target.value) })}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase">đ</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end">
              <button onClick={closeModal} className="h-11 rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="h-11 rounded-lg bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? 'Đang lưu...' : editingProduct ? 'Cập nhật sản phẩm' : 'Lưu sản phẩm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductList
