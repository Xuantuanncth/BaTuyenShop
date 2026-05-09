import { NextApiRequest, NextApiResponse } from 'next'
import { verifyAdminToken, isAllowedAdminEmail } from '../../../utils/firebaseAdmin'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies['admin-token']
  
  if (!token) {
    return res.status(200).json({ isAdmin: false })
  }

  try {
    const decoded = await verifyAdminToken(token)
    if (decoded && isAllowedAdminEmail(decoded.email)) {
      return res.status(200).json({ isAdmin: true, email: decoded.email })
    }
    return res.status(200).json({ isAdmin: false })
  } catch (error) {
    return res.status(200).json({ isAdmin: false })
  }
}
