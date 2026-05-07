import type { NextApiRequest, NextApiResponse } from 'next'
import { getAdminDb, isSameOriginRequest, requireAdminApi } from '../../utils/firebaseAdmin'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = getAdminDb()

    if (req.method === 'GET') {
      const { id } = req.query
      if (typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid settings id' })
      }

      const doc = await db.collection('settings').doc(id).get()
      if (!doc.exists) {
        return res.status(404).json({ message: 'Settings not found' })
      }

      return res.status(200).json(doc.data())
    }

    if (req.method === 'PATCH') {
      if (!isSameOriginRequest(req)) {
        return res.status(403).json({ message: 'Invalid request origin' })
      }

      await requireAdminApi(req)
      
      const { id } = req.query
      if (typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid settings id' })
      }

      const data = req.body
      await db.collection('settings').doc(id).set({
        ...data,
        updatedAt: new Date().toISOString(),
      }, { merge: true })

      return res.status(200).json({ message: 'Settings updated' })
    }

    return res.status(405).json({ message: 'Method not allowed' })
  } catch (error) {
    console.error('Settings API error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    const status = message === 'Unauthorized' ? 401 : 500
    return res.status(status).json({ message })
  }
}
