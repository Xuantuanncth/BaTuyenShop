import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import { verifyAdminToken } from '@/utils/firebaseAdmin'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin-token')?.value
  const admin = await verifyAdminToken(token)

  if (!admin) {
    redirect('/login')
  }

  return <AdminShell />
}
