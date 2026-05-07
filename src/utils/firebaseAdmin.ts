import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import type { NextApiRequest } from 'next'

function getPrivateKey() {
  return process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
}

function getAdminApp() {
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = getPrivateKey()

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase Admin service account configuration.')
  }

  if (getApps().length > 0) {
    return getApps()[0]
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  })
}

export function getAdminAuth() {
  return getAuth(getAdminApp())
}

export function getAdminDb() {
  return getFirestore(getAdminApp())
}

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map(email => email.trim().toLowerCase())
    .filter(Boolean)
}

export function isAllowedAdminEmail(email?: string) {
  if (!email) return false
  const adminEmails = getAdminEmails()
  return adminEmails.length > 0 && adminEmails.includes(email.toLowerCase())
}

export async function verifyAdminToken(token?: string) {
  if (!token) return null

  try {
    const decoded = await getAdminAuth().verifyIdToken(token, true)
    if (!isAllowedAdminEmail(decoded.email)) return null
    return decoded
  } catch {
    return null
  }
}

export async function requireAdminApi(req: NextApiRequest) {
  const token = req.cookies['admin-token']
  const admin = await verifyAdminToken(token)

  if (!admin) {
    throw new Error('Unauthorized')
  }

  return admin
}

export function isSameOriginRequest(req: NextApiRequest) {
  const origin = req.headers.origin
  const host = req.headers.host

  if (!origin || !host) return true

  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}
