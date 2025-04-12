import products from '@/data/products';
import Link from 'next/link';

export default function ProductList() {
  return (
    <div className="p-6 grid grid-cols-2 gap-4">
      {products.map(p => (
        <Link key={p.id} href={`/products/${p.id}`}>
          <div className="border p-4 rounded-lg shadow">
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
            <h2 className="font-bold">{p.name}</h2>
            <p>{p.price.toLocaleString()}đ</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
