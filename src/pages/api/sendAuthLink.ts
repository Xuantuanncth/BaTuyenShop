import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  return res.status(404).json({ message: 'Admin sign-up links are disabled.' })
}
