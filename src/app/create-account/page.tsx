'use client'
import { useState } from 'react'

export default function CreateAccountPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSendAuthLink = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch('/api/sendAuthLink', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (response.ok) {
      localStorage.setItem('emailForSignIn', email) // Store email in localStorage
      setSuccess('Authentication link sent to your email. Please check your inbox.')
      setError('')
      setEmail('')
    } else {
      const data = await response.json()
      setError(data.message)
      setSuccess('')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSendAuthLink} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Create Admin Account</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Send Authentication Link
        </button>
      </form>
    </div>
  )
}