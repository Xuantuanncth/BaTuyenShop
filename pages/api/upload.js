// filepath: d:\Working\NextJs\BaTuyenShop\pages\api\upload.js
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dr5ytgsg4', // Replace with your Cloudinary cloud name
  api_key: '817357978648681', // Replace with your Cloudinary API key
  api_secret: 'S3S8Z79elfVoEwGF3CYNVOMm7jw', // Replace with your Cloudinary API secret
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { file } = req.body; // Expect the file (base64 string) in the request body

      // Upload the image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(file, {
        folder: 'products', // Optional: Specify a folder in Cloudinary
      });

      res.status(200).json({ url: uploadResult.secure_url, public_id: uploadResult.public_id }); // Return the uploaded image URL and public_id
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}