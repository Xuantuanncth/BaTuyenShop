import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import Footer from '@/components/Footer'
import ProductSection from '@/components/ProductSection'

export default function Home() {
  return (
    <main className="bg-white text-gray-800">
      <Header />
      <HeroSection />
      <ProductSection title="Quần Áo" category="quan-ao" />
      <ProductSection title="Thức Ăn Chăn Nuôi" category="thuc-an" />
      <ProductSection title="Phân Bón" category="phan-bon" />

      <Footer />
    </main>
  )
}