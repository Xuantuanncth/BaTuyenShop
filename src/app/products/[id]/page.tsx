import products from '@/data/products';

export default function ProductDetail({ params }) {
  const product = products.find(p => p.id == params.id);

  if (!product) return <p>Sản phẩm không tồn tại</p>;

  return (
    <div className="p-6">
      <img src={product.image} alt={product.name} className="w-full h-60 object-cover" />
      <h1 className="text-xl font-bold mt-4">{product.name}</h1>
      <p className="text-lg">{product.price.toLocaleString()}đ</p>
      <p className="mt-2">{product.description}</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Thêm vào giỏ</button>
    </div>
  );
}
