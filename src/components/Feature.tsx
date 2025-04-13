export default function Feature() {
    const features = [
      { title: 'Dễ sử dụng', desc: 'Giao diện đơn giản, thân thiện cho người mới.' },
      { title: 'Bảo mật cao', desc: 'Dữ liệu được mã hóa và bảo vệ nghiêm ngặt.' },
      { title: 'Tùy biến mạnh mẽ', desc: 'Dễ dàng mở rộng theo nhu cầu của bạn.' }
    ]
  
    return (
      <section className="py-20 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-10">Tính năng nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }
  