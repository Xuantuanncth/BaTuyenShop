import Link from 'next/link'

export default function CreateAccountPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded bg-white p-6 text-center shadow-md">
        <h2 className="mb-3 text-2xl font-bold">Tạo tài khoản đã bị tắt</h2>
        <p className="mb-5 text-sm leading-6 text-gray-600">
          Tài khoản admin phải được tạo trong Firebase Console và thêm vào biến ADMIN_EMAILS.
        </p>
        <Link href="/login" className="inline-flex rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Quay lại đăng nhập
        </Link>
      </div>
    </div>
  )
}
