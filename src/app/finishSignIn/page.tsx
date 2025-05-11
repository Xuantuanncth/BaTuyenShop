'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '../../utils/firebaseConfig'
import { isSignInWithEmailLink, signInWithEmailLink, updatePassword } from 'firebase/auth'

export default function FinishSignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!isSignInWithEmailLink(auth, window.location.href)) {
      setError('Invalid or expired sign-in link.')
      return
    }

    // Retrieve email from localStorage if available
    const storedEmail = localStorage.getItem('emailForSignIn')
    if (storedEmail) {
      setEmail(storedEmail)
    }
  }, [])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const result = await signInWithEmailLink(auth, email, window.location.href)
      console.log('User signed in:', result.user)

      // Clear the email from localStorage after successful sign-in
      localStorage.removeItem('emailForSignIn')

      // Prompt the user to set a password
      if (password) {
        await updatePassword(result.user, password)
        setSuccess('Password set successfully! You can now log in with your email and password.')
        setError('')
      } else {
        setError('Please enter a password to complete the setup.')
      }

      router.push('/admin') // Redirect to admin page on success
    } catch (error) {
      console.error('Error signing in or updating password:', error)
      setError('Failed to sign in or set password. Please try again.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSignIn} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Complete Sign-In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Set a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Sign In and Set Password
        </button>
      </form>
    </div>
  )
}