import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'your_cloud_name', // Replace with your Cloudinary cloud name
  api_key: 'your_api_key', // Replace with your Cloudinary API key
  api_secret: 'your_api_secret', // Replace with your Cloudinary API secret
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