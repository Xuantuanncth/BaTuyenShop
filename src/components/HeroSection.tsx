import Image from 'next/image';
import Link from 'next/link';
import Header_image from '../../public/images/landing_pages/header_image.jpg';
import Model_image from '../../public/images/landing_pages/model-watch.png';

const HeroSection = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Bên trái: Tiêu đề, mô tả, logo thương hiệu, sản phẩm */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Discover <span className="text-blue-500">your favorite</span> brand
          </h1>
          <p className="text-gray-600 mb-6">
            Amazing Shopping play an important role in making the Sale shop a brand
          </p>
          <div className="mt-8">
            <Image
              src={Model_image} // Thay thế bằng đường dẫn ảnh thật
              alt="Nike air shoes"
              width={200}
              height={150}
              objectFit="contain"
            />
            <p className="text-gray-700 mt-2">Nike air shoes</p>
            <Link href="/nike" className="text-blue-500 hover:underline">
              Shop now
            </Link>
          </div>
        </div>

        {/* Giữa: Hình ảnh người mẫu lớn */}
        <div className="relative">
          <Image
            src= {Header_image} // Thay thế bằng đường dẫn ảnh thật
            alt="Model wearing watch"
            layout="responsive"
            width={500}
            height={600}
            objectFit="cover"
          />
        </div>

        {/* Bên phải: Sản phẩm nổi bật */}
        <div className="text-center md:text-right">
          <div className="mb-8">
            <Image
              src={Model_image} // Thay thế bằng đường dẫn ảnh thật
              alt="Best sunglasses for men"
              width={200}
              height={100}
              objectFit="contain"
            />
            <h3 className="text-xl font-semibold text-gray-800 mt-2">
              Best sunglasses for men
            </h3>
            <p className="text-gray-600 text-sm">
              Trendy fashion sunglasses for men
            </p>
            <Link href="/sunglasses" className="text-blue-500 hover:underline">
              Show all men sunglasses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;