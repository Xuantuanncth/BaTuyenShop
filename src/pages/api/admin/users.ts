import { NextApiRequest, NextApiResponse } from 'next'
import { getAdminDb, requireAdminApi } from '../../../utils/firebaseAdmin'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 1. Verify admin access
    await requireAdminApi(req)

    const db = getAdminDb()
    const usersRef = db.collection('users')

    if (req.method === 'GET') {
      // Fetch all users
      const snapshot = await usersRef.orderBy('createdAt', 'desc').get()
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      return res.status(200).json(users)
    }

    if (req.method === 'PATCH') {
      // Update user role or status
      const { userId, ...updates } = req.body
      if (!userId) return res.status(400).json({ message: 'User ID is required' })

      await usersRef.doc(userId).update(updates)
      return res.status(200).json({ message: 'User updated successfully' })
    }

    if (req.method === 'DELETE') {
      // Delete user (Optional/Soft delete recommended)
      const { userId } = req.query
      if (!userId) return res.status(400).json({ message: 'User ID is required' })

      await usersRef.doc(userId as string).delete()
      return res.status(200).json({ message: 'User deleted successfully' })
    }

    return res.status(405).json({ message: 'Method not allowed' })
  } catch (error: any) {
    console.error('Admin Users API Error:', error)
    if (error.message === 'Unauthorized') {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}
