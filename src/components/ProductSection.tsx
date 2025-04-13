'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProductModal from './ProductModal'

interface Product {
    id: number
    name: string
    description: string
    image: string
    category: string
    quantity?: number
    price?: number
  }

  const dummyProducts: Product[] = [
    {
      id: 1,
      name: 'Áo Thun Nông Dân',
      description: 'Thoáng mát, thích hợp làm việc ngoài trời.',
      image: 'https://via.placeholder.com/400x300',
      category: 'quan-ao',
      quantity: 100,
      price: 150000
    },
    {
      id: 2,
      name: 'Quần Bò Đi Rẫy',
      description: 'Bền bỉ, chịu được môi trường khắc nghiệt.',
      image: 'https://via.placeholder.com/400x300',
      category: 'quan-ao',
      quantity: 100,
      price: 150000
    },
    {
      id: 3,
      name: 'Mũ Tai Bèo',
      description: 'Che nắng, bảo vệ da khỏi tia UV.',
      image: 'https://via.placeholder.com/400x300',
      category: 'quan-ao',
      quantity: 100,
      price: 150000
    },
    {
      id: 4,
      name: 'Găng Tay Lao Động',
      description: 'Giúp tay không bị trầy xước khi làm việc.',
      image: 'https://via.placeholder.com/400x300',
      category: 'quan-ao',
      quantity: 100,
      price: 150000
    },
    {
      id: 5,
      name: 'Khăn Rằn',
      description: 'Đa năng, thấm hút mồ hôi tốt.',
      image: 'https://via.placeholder.com/400x300',
      category: 'quan-ao',
      quantity: 100,
      price: 150000
    },
    {
      id: 6,
      name: 'Áo Bà Ba',
      description: 'Truyền thống, thoải mái khi mặc.',
      image: 'https://via.placeholder.com/400x300',
      category: 'quan-ao',
      quantity: 100,
      price: 150000
    },
    {
      id: 7,
      name: 'Nón Lá',
      description: 'Che mưa, che nắng hiệu quả.',
      image: 'https://via.placeholder.com/400x300',
      category: 'quan-ao',
      quantity: 100,
      price: 150000
    },
    {
      id: 8,
      name: 'Ủng Cao Su',
      description: 'Chống nước, bảo vệ chân trong môi trường ẩm ướt.',
      image: 'https://via.placeholder.com/400x300',
      category: 'quan-ao',
      quantity: 100,
      price: 150000
    },
    {
      id: 9,
      name: 'Áo Khoác Chống Nắng',
      description: 'Giúp bảo vệ da khỏi tác hại của ánh nắng mặt trời.',
      image: 'https://via.placeholder.com/400x300',
      category: 'quan-ao',
      quantity: 100,
      price: 150000
    },
    {
      id: 10,
      name: 'Bộ Quần Áo Bảo Hộ',
      description: 'An toàn, thoải mái vận động khi làm việc nặng.',
      image: 'https://via.placeholder.com/400x300',
      category: 'quan-ao',
      quantity: 100,
      price: 150000
    },
    {
      id: 11,
      name: 'Thức Ăn Gà Con',
      description: 'Cung cấp đầy đủ dinh dưỡng cho giai đoạn phát triển của gà con.',
      image: 'https://via.placeholder.com/400x300',
      category: 'thuc-an',
      quantity: 100,
      price: 150000
    },
    {
      id: 12,
      name: 'Thức Ăn Vịt Xiêm',
      description: 'Giúp vịt xiêm tăng trưởng nhanh và khỏe mạnh.',
      image: 'https://via.placeholder.com/400x300',
      category: 'thuc-an',
      quantity: 100,
      price: 150000
    },
    {
      id: 13,
      name: 'Cám Heo',
      description: 'Nguồn năng lượng chính và dinh dưỡng cần thiết cho heo.',
      image: 'https://via.placeholder.com/400x300',
      category: 'thuc-an',
      quantity: 100,
      price: 150000
    },
    {
      id: 14,
      name: 'Lúa',
      description: 'Thực phẩm cơ bản cho nhiều loại gia súc và gia cầm.',
      image: 'https://via.placeholder.com/400x300',
      category: 'thuc-an',
      quantity: 100,
      price: 150000
    },
    {
      id: 15,
      name: 'Bắp',
      description: 'Nguồn dinh dưỡng quan trọng, giàu carbohydrate.',
      image: 'https://via.placeholder.com/400x300',
      category: 'thuc-an',
      quantity: 100,
      price: 150000
    },
    {
      id: 16,
      name: 'Rau Muống',
      description: 'Nguồn thức ăn xanh tươi ngon cho một số loại gia cầm.',
      image: 'https://via.placeholder.com/400x300',
      category: 'thuc-an',
      quantity: 100,
      price: 150000
    },
    {
      id: 17,
      name: 'Cỏ Voi',
      description: 'Nguồn thức ăn thô xanh quan trọng cho gia súc nhai lại.',
      image: 'https://via.placeholder.com/400x300',
      category: 'thuc-an',
      quantity: 100,
      price: 150000
    },
    {
      id: 18,
      name: 'Bã Đậu Nành',
      description: 'Giàu protein, tốt cho sự phát triển của vật nuôi.',
      image: 'https://via.placeholder.com/400x300',
      category: 'thuc-an',
      quantity: 100,
      price: 150000
    },
    {
      id: 19,
      name: 'Thức Ăn Viên Cho Cá',
      description: 'Cân bằng dinh dưỡng, giúp cá phát triển khỏe mạnh.',
      image: 'https://via.placeholder.com/400x300',
      category: 'thuc-an',
      quantity: 100,
      price: 150000
    },
    {
      id: 20,
      name: 'Muối Khoáng Cho Gia Súc',
      description: 'Bổ sung các khoáng chất cần thiết cho sự phát triển của gia súc.',
      image: 'https://via.placeholder.com/400x300',
      category: 'thuc-an',
      quantity: 100,
      price: 150000
    },
    {
      id: 21,
      name: 'Phân Lân',
      description: 'Kích thích ra rễ, giúp cây con phát triển khỏe mạnh.',
      image: 'https://via.placeholder.com/400x300',
      category: 'phan-bon',
      quantity: 100,
      price: 150000
    },
    {
      id: 22,
      name: 'Phân Đạm',
      description: 'Tăng cường sự phát triển của chồi và lá.',
      image: 'https://via.placeholder.com/400x300',
      category: 'phan-bon',
      quantity: 100,
      price: 150000
    },
    {
      id: 23,
      name: 'Phân Kali',
      description: 'Giúp cây ra hoa đậu quả, tăng sức đề kháng.',
      image: 'https://via.placeholder.com/400x300',
      category: 'phan-bon',
      quantity: 100,
      price: 150000
    },
    {
      id: 24,
      name: 'Phân Trùn Quế',
      description: 'Phân hữu cơ tự nhiên, cải tạo đất, tốt cho cây trồng.',
      image: 'https://via.placeholder.com/400x300',
      category: 'phan-bon',
      quantity: 100,
      price: 150000
    },
    {
      id: 25,
      name: 'Phân Gà',
      description: 'Nguồn phân hữu cơ giàu dinh dưỡng, giúp cây phát triển bền vững.',
      image: 'https://via.placeholder.com/400x300',
      category: 'phan-bon',
      quantity: 100,
      price: 150000
    },
    {
      id: 26,
      name: 'Vôi Bột',
      description: 'Khử chua đất, cung cấp canxi cho cây.',
      image: 'https://via.placeholder.com/400x300',
      category: 'phan-bon',
      quantity: 100,
      price: 150000
    },
    {
      id: 27,
      name: 'NPK 16-16-8',
      description: 'Phân bón hóa học hỗn hợp, cung cấp đầy đủ đạm, lân, kali.',
      image: 'https://via.placeholder.com/400x300',
      category: 'phan-bon',
      quantity: 100,
      price: 150000
    },
    {
      id: 28,
      name: 'DAP',
      description: 'Phân bón hóa học giàu lân và đạm, kích thích ra rễ và chồi.',
      image: 'https://via.placeholder.com/400x300',
      category: 'phan-bon',
      quantity: 100,
      price: 150000
    },
    {
      id: 29,
      name: 'Phân Vi Sinh',
      description: 'Tăng cường hệ vi sinh vật có lợi trong đất, giúp cây hấp thụ dinh dưỡng tốt hơn.',
      image: 'https://via.placeholder.com/400x300',
      category: 'phan-bon',
      quantity: 100,
      price: 150000
    },
    {
      id: 30,
      name: 'Humic Acid',
      description: 'Cải thiện cấu trúc đất, tăng khả năng giữ nước và dinh dưỡng.',
      image: 'https://via.placeholder.com/400x300',
      category: 'phan-bon',
      quantity: 100,
      price: 150000
    }
  ]
  
  export default function ProductSection({ title, category }: { title: string; category: string }) {
    const [start, setStart] = useState(0)
    const [filtered, setFiltered] = useState<Product[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null) 
  
    useEffect(() => {
      const items = dummyProducts.filter((p) => p.category === category)
      setFiltered(items)
      setStart(0)
    }, [category])
  
    const visible = filtered.slice(start, start + 3)
    const canPrev = start > 0
    const canNext = start + 3 < filtered.length
  
    return (
      <section id={category} className="py-16 px-8">
        <h2 className="text-4xl font-bold mb-10 text-center text-blue-700">{title}</h2>
  
        <div className="flex justify-center gap-10 flex-wrap min-h-[400px]">
          <AnimatePresence mode="wait">
            {visible.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-6 w-96 transition-transform transform hover:scale-105"
              >
                <img src={p.image} alt={p.name} className="w-full h-60 object-cover rounded-xl" />
                <h3 className="text-2xl font-semibold mt-4">{p.name}</h3>
                <p className="text-gray-600 text-base mt-2">{p.description}</p>
                <p className="text-blue-700 text-lg font-bold mt-2">Giá: {p.price}</p>
                <button
                  onClick={() => setSelectedProduct(p)}
                  className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Xem chi tiết
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
  
        <div className="flex justify-center gap-6 mt-8">
          <button
            className={`px-5 py-3 rounded-full text-lg bg-gray-300 hover:bg-gray-400 ${!canPrev ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => canPrev && setStart(start - 3)}
            disabled={!canPrev}
          >
            ◀
          </button>
          <button
            className={`px-5 py-3 rounded-full text-lg bg-gray-300 hover:bg-gray-400 ${!canNext ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => canNext && setStart(start + 3)}
            disabled={!canNext}
          >
            ▶
          </button>
        </div>
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      </section>
    )
  }