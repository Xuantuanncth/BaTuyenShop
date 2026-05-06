import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import Footer from '@/components/Footer'
import ProductSection from '@/components/ProductSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbfaf5] text-slate-900">
      <Header />
      <HeroSection />
      <div className="border-y border-stone-200 bg-white/70">
        <ProductSection title="Quần áo" category="quan-ao" eyebrow="Lựa chọn hằng ngày" />
        <ProductSection title="Thức ăn chăn nuôi" category="thuc-an" eyebrow="Hàng nông nghiệp" />
        <ProductSection title="Phân bón" category="phan-bon" eyebrow="Chăm sóc mùa vụ" />
      </div>
      <Footer />
    </main>
  )
}
