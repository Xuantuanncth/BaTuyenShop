// filepath: d:\Working\NextJs\BaTuyenShop\pages\api\upload.js
import { v2 as cloudinary } from 'cloudinary';
import { isSameOriginRequest, requireAdminApi } from '../../utils/firebaseAdmin';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
};

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name from .env.local
  api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key from .env.local
  api_secret: process.env.CLOUDINARY_API_SECRET, // Cloudinary API secret from .env.local
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      if (!isSameOriginRequest(req)) {
        return res.status(403).json({ error: 'Invalid request origin' });
      }

      await requireAdminApi(req);

      const { file } = req.body; // Expect the file (base64 string) in the request body

      if (typeof file !== 'string' || !/^data:image\/(png|jpe?g|webp);base64,/.test(file)) {
        return res.status(400).json({ error: 'Only PNG, JPG, JPEG, or WEBP images are allowed' });
      }

      // Upload the image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(file, {
        folder: 'products', // Optional: Specify a folder in Cloudinary
        resource_type: 'image',
      });

      res.status(200).json({ url: uploadResult.secure_url, public_id: uploadResult.public_id }); // Return the uploaded image URL and public_id
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      const status = error instanceof Error && error.message === 'Unauthorized' ? 401 : 500;
      res.status(status).json({ error: status === 401 ? 'Unauthorized' : 'Failed to upload image' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
