import { v2 as cloudinary } from 'cloudinary'
import { isSameOriginRequest, requireAdminApi } from '../../utils/firebaseAdmin'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { public_id } = req.body

    try {
      if (!isSameOriginRequest(req)) {
        return res.status(403).json({ error: 'Invalid request origin' })
      }

      await requireAdminApi(req)

      if (typeof public_id !== 'string' || !/^products\/[A-Za-z0-9/_-]+$/.test(public_id)) {
        return res.status(400).json({ error: 'Invalid image id' })
      }

      // Delete the image from Cloudinary
      const result = await cloudinary.uploader.destroy(public_id)
      res.status(200).json({ result })
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error)
      const status = error instanceof Error && error.message === 'Unauthorized' ? 401 : 500
      res.status(status).json({ error: status === 401 ? 'Unauthorized' : 'Failed to delete image from Cloudinary' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
