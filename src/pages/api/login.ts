import { NextApiRequest, NextApiResponse } from 'next'
import { isAllowedAdminEmail, verifyAdminToken } from '../../utils/firebaseAdmin'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { token } = req.body

    if (!token) {
      return res.status(400).json({ message: 'Token is required' })
    }

    try {
      // Verify the token using firebase-admin
      const decodedToken = await verifyAdminToken(token)

      if (decodedToken && isAllowedAdminEmail(decodedToken.email)) {
        // User is an admin, set the admin-token cookie
        const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
        res.setHeader(
          'Set-Cookie',
          `admin-token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=43200${secure}`,
        )
        return res.status(200).json({ message: 'Admin login successful', role: 'admin' })
      }

      // User is a regular customer (or at least valid Firebase user)
      return res.status(200).json({ message: 'Login successful', role: 'customer' })
    } catch (error: any) {
      console.error('Error verifying token:', error)
      return res.status(401).json({ message: 'Invalid token' })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
