import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
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
  // Thêm các sản phẩm khác nếu cần
];

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleAdd = () => {
    // Logic thêm sản phẩm mới
  };

  const handleEdit = (id: number) => {
    // Logic chỉnh sửa sản phẩm
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

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
                  onClick={() => handleEdit(product.id)}
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
    </div>
  );
};

export default ProductList;
