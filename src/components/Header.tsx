export default function Header() {
    return (
      <header className="flex items-center justify-between px-8 py-6 shadow-md bg-blue-700 text-white sticky top-0 z-50">
        <div className="text-3xl font-bold">Nông Shop</div>
        <nav className="space-x-6 text-lg">
          <a href="#quan-ao" className="hover:underline">Quần Áo</a>
          <a href="#thuc-an" className="hover:underline">Thức Ăn</a>
          <a href="#phan-bon" className="hover:underline">Phân Bón</a>
        </nav>
      </header>
    )
  }