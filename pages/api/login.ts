// filepath: d:\Working\NextJs\BaTuyenShop\pages\api\login.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../src/utils/firebaseConfig'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    try {
      // Authenticate the user with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const token = await userCredential.user.getIdToken()

      // Set the token as a cookie
      res.setHeader('Set-Cookie', `admin-token=${token}; Path=/; HttpOnly`)
      return res.status(200).json({ message: 'Login successful' })
    } catch (error) {
      console.error('Error logging in:', error)
      return res.status(401).json({ message: 'Invalid credentials' })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' })
}