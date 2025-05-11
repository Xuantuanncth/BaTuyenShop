import { NextApiRequest, NextApiResponse } from 'next'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../src/utils/firebaseConfig' // Adjust the import path as necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    try {
      // Create a new user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      return res.status(200).json({ message: 'Account created successfully', user: userCredential.user })
    } catch (error) {
      console.error('Error creating account:', error)
      return res.status(400).json({ message: 'Failed to create account', error: error.message })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' })
}