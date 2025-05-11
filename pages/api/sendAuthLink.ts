import { NextApiRequest, NextApiResponse } from 'next'
import { sendSignInLinkToEmail } from 'firebase/auth'
import { auth } from '../../src/utils/firebaseConfig'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body

    try {
      const actionCodeSettings = {
        url: 'http://localhost:3000/finishSignIn', // Replace with your app's URL
        handleCodeInApp: true,
      }

      // Send the sign-in link to the user's email
      await sendSignInLinkToEmail(auth, email, actionCodeSettings)

      // Save the email in localStorage (client-side)
      res.status(200).json({ message: 'Authentication link sent to email' })
    } catch (error) {
      console.error('Error sending authentication link:', error)
      res.status(400).json({ message: 'Failed to send authentication link', error: error.message })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}