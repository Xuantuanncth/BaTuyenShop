import Image from 'next/image'
import Link from 'next/link'
import HeaderImage from '../../public/images/landing_pages/header_image.jpg'
import ModelImage from '../../public/images/landing_pages/model-watch.png'

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-16">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#fbfaf5_0%,#f0eadb_48%,#dbe7dd_100%)]" />
      <div className="relative mx-auto grid min-h-[620px] max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex rounded-full border border-emerald-200 bg-white/75 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm">
            Hàng thiết yếu cho gia đình và nông trại
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] text-slate-950 sm:text-5xl lg:text-6xl">
            Ba Tuyen Shop
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700">
            Cửa hàng tổng hợp với quần áo, thức ăn chăn nuôi và phân bón được sắp xếp rõ ràng để bạn chọn nhanh hơn.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#quan-ao"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-emerald-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
            >
              Xem sản phẩm
            </Link>
            <Link
              href="#thuc-an"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-stone-300 bg-white/80 px-6 text-sm font-semibold text-slate-800 transition hover:border-emerald-300 hover:text-emerald-800"
            >
              Hàng nông nghiệp
            </Link>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 gap-3">
            {[
              ['3+', 'Nhóm hàng'],
              ['Mỗi ngày', 'Cập nhật'],
              ['Rõ ràng', 'Giá và mô tả'],
            ].map(([value, label]) => (
              <div key={label} className="border-l border-emerald-200 pl-4">
                <p className="text-lg font-semibold text-slate-950">{value}</p>
                <p className="mt-1 text-sm text-slate-600">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-white/70 bg-white/40 shadow-2xl shadow-emerald-950/10">
          <Image
            src={HeaderImage}
            alt="Sản phẩm tại Ba Tuyen Shop"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-white/90 p-4 shadow-lg backdrop-blur">
            <p className="text-sm font-semibold text-slate-950">Sản phẩm nổi bật</p>
            <p className="mt-1 text-sm text-slate-600">Chọn theo từng nhóm hàng, xem chi tiết trong một thao tác.</p>
          </div>
          <div className="absolute right-5 top-5 hidden rounded-lg bg-amber-100 p-3 shadow-lg sm:block">
            <Image
              src={ModelImage}
              alt="Mặt hàng mẫu"
              width={92}
              height={92}
              className="object-contain"
              style={{ width: '92px', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
