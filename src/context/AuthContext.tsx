'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, User, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { getAuthClient, getDb } from '@/utils/firebaseConfig'

interface UserMetadata {
  name?: string
  phone?: string
  address?: string
  role?: string
}

interface AuthContextType {
  user: User | null
  metadata: UserMetadata | null
  loading: boolean
  isAdmin: boolean
  logout: () => Promise<void>
  refreshMetadata: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  metadata: null,
  loading: true,
  isAdmin: false,
  logout: async () => {},
  refreshMetadata: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [metadata, setMetadata] = useState<UserMetadata | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  const fetchMetadata = async (currentUser: User) => {
    const db = getDb()
    const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
    if (userDoc.exists()) {
      setMetadata(userDoc.data() as UserMetadata)
    }

    try {
      const res = await fetch('/api/auth/me')
      const data = await res.json()
      setIsAdmin(data.isAdmin)
    } catch (err) {
      console.error('Error checking admin status:', err)
      setIsAdmin(false)
    }
  }

  const refreshMetadata = async () => {
    if (user) {
      await fetchMetadata(user)
    }
  }

  useEffect(() => {
    const auth = getAuthClient()
    const db = getDb()
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      
      if (currentUser) {
        await fetchMetadata(currentUser)
      } else {
        setMetadata(null)
        setIsAdmin(false)
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    const auth = getAuthClient()
    await signOut(auth)
    // Also clear the admin-token cookie via an API
    await fetch('/api/logout', { method: 'POST' })
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider value={{ user, metadata, loading, isAdmin, logout, refreshMetadata }}>
      {children}
    </AuthContext.Provider>
  )
}
