import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import type { NextApiRequest } from 'next'

function isLocalAuthBypassEnabled() {
  // Only allow bypass in local development and only if explicitly enabled
  return process.env.NODE_ENV === 'development' && process.env.ENABLE_LOCAL_AUTH_BYPASS === 'true'
}

console.log("by pass authen local", isLocalAuthBypassEnabled())

const isDebug = process.env.DEBUG_FIREBASE === 'true'

function getPrivateKey() {
  let key = process.env.FIREBASE_PRIVATE_KEY
  let source = 'FIREBASE_PRIVATE_KEY'

  if (isDebug) {
    console.log('[FirebaseAdmin] Checking private key sources...')
  }

  // Fallback to Base64 if needed (Vercel best practice)
  if (!key && process.env.FIREBASE_PRIVATE_KEY_B64) {
    if (isDebug) console.log('[FirebaseAdmin] Falling back to FIREBASE_PRIVATE_KEY_B64')
    key = Buffer.from(process.env.FIREBASE_PRIVATE_KEY_B64, 'base64').toString('utf8')
    source = 'FIREBASE_PRIVATE_KEY_B64'
  }

  if (!key) {
    if (isDebug) console.error('[FirebaseAdmin] Private key not found in any source.')
    return undefined
  }

  if (isDebug) {
    console.log(`[FirebaseAdmin] Key found from source: ${source}`)
    console.log(`[FirebaseAdmin] Key length: ${key.length}`)
    console.log(`[FirebaseAdmin] Key starts with: ${key.substring(0, 20)}...`)
    console.log(`[FirebaseAdmin] Key ends with: ...${key.substring(key.length - 20)}`)
  }

  // Handle keys that might be wrapped in quotes or have escaped newlines
  const processedKey = key
    .replace(/^["']|["']$/g, '') // Remove wrapping quotes
    .replace(/\\n/g, '\n')       // Convert literal \n to actual newlines
    .replace(/\r/g, '')          // Remove carriage returns
    .trim()

  if (isDebug && processedKey !== key) {
    console.log('[FirebaseAdmin] Private key was processed (removed quotes/escaped newlines).')
    console.log(`[FirebaseAdmin] Processed key length: ${processedKey.length}`)
  }

  return processedKey
}

function getAdminApp() {
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = getPrivateKey()

  if (!projectId || !clientEmail || !privateKey) {
    const missing = []
    if (!projectId) missing.push('FIREBASE_PROJECT_ID')
    if (!clientEmail) missing.push('FIREBASE_CLIENT_EMAIL')
    if (!privateKey) missing.push('FIREBASE_PRIVATE_KEY')

    const errorMsg = `Missing Firebase Admin service account configuration: ${missing.join(', ')}`
    if (isDebug) console.error(`[FirebaseAdmin] ${errorMsg}`)
    throw new Error(errorMsg)
  }

  if (getApps().length > 0) {
    if (isDebug) console.log('[FirebaseAdmin] Reusing existing app instance')
    return getApps()[0]
  }

  if (isDebug) console.log('[FirebaseAdmin] Initializing new app instance')
  try {
    return initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    })
  } catch (error) {
    if (isDebug) console.error('[FirebaseAdmin] Initialization failed:', error)
    throw error
  }
}

export function getAdminAuth() {
  return getAuth(getAdminApp())
}

export function getAdminDb() {
  return getFirestore(getAdminApp())
}

function getAdminEmails() {
  const rawEmails = process.env.ADMIN_EMAILS || ''
  if (isDebug) {
    console.log(`[FirebaseAdmin] Raw ADMIN_EMAILS: "${rawEmails}"`)
  }
  const emails = rawEmails
    .split(',')
    .map(email => email.trim().toLowerCase())
    .filter(Boolean)

  if (isDebug) {
    console.log(`[FirebaseAdmin] Parsed admin emails:`, emails)
  }
  return emails
}

export function isAllowedAdminEmail(email?: string) {
  if (!email) {
    if (isDebug) console.warn('[FirebaseAdmin] isAllowedAdminEmail: No email provided')
    return false
  }

  const adminEmails = getAdminEmails()
  const normalizedEmail = email.trim().toLowerCase()
  const isAllowed = adminEmails.includes(normalizedEmail)

  if (isDebug && !isAllowed) {
    console.warn(`[FirebaseAdmin] Email "${normalizedEmail}" not found in allowed list:`, adminEmails)
  }

  return isAllowed
}

export async function verifyAdminToken(token?: string) {
  if (!token && isLocalAuthBypassEnabled()) {
    return {
      uid: 'local-dev-admin',
      email: 'local-dev-admin@example.com',
    }
  }

  if (!token) return null

  try {
    const decoded = await getAdminAuth().verifyIdToken(token, true)
    if (!isAllowedAdminEmail(decoded.email)) {
      if (isDebug) console.warn(`[FirebaseAdmin] Email not allowed: ${decoded.email}`)
      return null
    }
    return decoded
  } catch (error) {
    if (isDebug) {
      console.error('[FirebaseAdmin] Token verification failed:', error)
    }
    return null
  }
}

export async function requireAdminApi(req: NextApiRequest) {
  if (isLocalAuthBypassEnabled()) {
    return {
      uid: 'local-dev-admin',
      email: 'local-dev-admin@example.com',
    }
  }

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
