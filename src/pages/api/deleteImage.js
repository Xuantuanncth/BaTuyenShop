import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { public_id } = req.body

    try {
      // Delete the image from Cloudinary
      const result = await cloudinary.uploader.destroy(public_id)
      res.status(200).json({ result })
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error)
      res.status(500).json({ error: 'Failed to delete image from Cloudinary' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
