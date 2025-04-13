"use client";
import Link from 'next/link';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi'; // Sử dụng các icon
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter();
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-30">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between relative"> {/* Make the container relative */}
        {/* Logo bên trái */}
        <Link href="/" className="text-xl font-bold text-gray-800">
          Logo
        </Link>

        {/* Navigation bên trái */}
        {/* <nav className="hidden md:flex space-x-4">
          <Link href="/shop" className="text-gray-700 hover:text-blue-500">Shop</Link>
          <Link href="/category" className="text-gray-700 hover:text-blue-500">Category</Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-500">Contact</Link>
        </nav> */}

        {/* Logo/Tên thương hiệu ở giữa (có thể ẩn trên mobile) */}
        <div className="hidden md:block absolute top-1/2 transform -translate-y-1/2 text-center" style={{ left: '40%' }}>
          <Link href="/" className="text-2xl font-bold text-blue-500">
            Cửa Hàng Bà Tuyến
          </Link>
        </div>

        {/* Icons bên phải */}
        <div className="flex items-center space-x-4">
          <FiSearch className="text-xl text-gray-700 cursor-pointer" />
          <div className="relative">
            <FiShoppingCart className="text-xl text-gray-700 cursor-pointer" />
          </div>
          <FiUser className="text-xl text-gray-700 cursor-pointer" 
           onClick={() => router.push('/admin')}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;