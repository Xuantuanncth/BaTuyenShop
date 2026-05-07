import { cookies } from 'next/headers'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import Footer from '@/components/Footer'
import ProductSection from '@/components/ProductSection'
import { verifyAdminToken, getAdminDb } from '@/utils/firebaseAdmin'

export default async function Home() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin-token')?.value
  const admin = await verifyAdminToken(token)
  const isAdmin = !!admin

  // Fetch Hero settings
  let heroData = null
  try {
    const db = getAdminDb()
    const doc = await db.collection('settings').doc('hero').get()
    if (doc.exists) {
      heroData = doc.data()
    }
  } catch (error) {
    console.error('Error fetching hero data:', error)
  }

  return (
    <main className="min-h-screen bg-[#fbfaf5] text-slate-900">
      <Header />
      <HeroSection isAdmin={isAdmin} initialData={heroData} />
      <div className="border-y border-stone-200 bg-white/70">
        <ProductSection title="Quần áo" category="quan-ao" eyebrow="Lựa chọn hằng ngày" />
        <ProductSection title="Thức ăn chăn nuôi" category="thuc-an" eyebrow="Hàng nông nghiệp" />
        <ProductSection title="Phân bón" category="phan-bon" eyebrow="Chăm sóc mùa vụ" />
      </div>
      <Footer />
    </main>
  )
}
