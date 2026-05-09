import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    res.setHeader(
      'Set-Cookie',
      'admin-token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
    )
    return res.status(200).json({ message: 'Logged out' })
  }
  return res.status(405).json({ message: 'Method not allowed' })
}
