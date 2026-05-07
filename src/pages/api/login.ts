// filepath: d:\Working\NextJs\BaTuyenShop\pages\api\login.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getAuthClient } from '../../utils/firebaseConfig'
import { isAllowedAdminEmail, verifyAdminToken } from '../../utils/firebaseAdmin'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    try {
      // Authenticate the user with Firebase
      console.log('Attempting to sign in with email:', email)
      console.log("password:", password ? '******' : 'No password provided')
      const userCredential = await signInWithEmailAndPassword(getAuthClient(), email, password)
      const token = await userCredential.user.getIdToken()
      const verifiedToken = await verifyAdminToken(token)

      if (!verifiedToken || !isAllowedAdminEmail(verifiedToken.email)) {
        return res.status(403).json({ message: 'This account is not allowed to access admin.' })
      }

      // Set the token as a cookie
      const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
      res.setHeader(
        'Set-Cookie',
        `admin-token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=43200${secure}`,
      )
      return res.status(200).json({ message: 'Login successful' })
    } catch (error) {
      console.error('Error logging in:', error)
      return res.status(401).json({ message: 'Invalid credentials' })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
