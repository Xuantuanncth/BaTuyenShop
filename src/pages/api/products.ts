import type { NextApiRequest, NextApiResponse } from 'next'
import { getAdminDb, isSameOriginRequest, requireAdminApi } from '../../utils/firebaseAdmin'

type ProductInput = {
  name?: unknown
  description?: unknown
  price?: unknown
  category?: unknown
  quantity?: unknown
  image?: unknown
  public_id?: unknown
}

const allowedCategories = new Set(['quan-ao', 'thuc-an', 'phan-bon'])

function parseProduct(input: ProductInput) {
  const name = typeof input.name === 'string' ? input.name.trim() : ''
  const description = typeof input.description === 'string' ? input.description.trim() : ''
  const category = typeof input.category === 'string' ? input.category : ''
  const price = Number(input.price)
  const quantity = Number(input.quantity)
  const image = typeof input.image === 'string' ? input.image : ''
  const publicId = typeof input.public_id === 'string' ? input.public_id : ''

  if (!name || name.length > 120) throw new Error('Invalid product name')
  if (!description || description.length > 1000) throw new Error('Invalid product description')
  if (!allowedCategories.has(category)) throw new Error('Invalid product category')
  if (!Number.isFinite(price) || price < 0) throw new Error('Invalid product price')
  if (!Number.isFinite(quantity) || quantity < 0) throw new Error('Invalid product quantity')
  if (image && !/^https:\/\/res\.cloudinary\.com\//.test(image)) throw new Error('Invalid product image')
  if (publicId && !/^products\/[A-Za-z0-9/_-]+$/.test(publicId)) throw new Error('Invalid product image id')

  return {
    name,
    description,
    category,
    price,
    quantity,
    image,
    public_id: publicId,
    updatedAt: new Date().toISOString(),
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!isSameOriginRequest(req)) {
      return res.status(403).json({ message: 'Invalid request origin' })
    }

    await requireAdminApi(req)
    const db = getAdminDb()

    if (req.method === 'GET') {
      const snapshot = await db.collection('products').get()
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      return res.status(200).json({ products })
    }

    if (req.method === 'POST') {
      const product = parseProduct(req.body)
      const docRef = await db.collection('products').add({
        ...product,
        createdAt: new Date().toISOString(),
      })
      return res.status(201).json({ product: { id: docRef.id, ...product } })
    }

    if (req.method === 'PATCH') {
      const id = typeof req.query.id === 'string' ? req.query.id : ''
      if (!/^[A-Za-z0-9_-]{8,}$/.test(id)) {
        return res.status(400).json({ message: 'Invalid product id' })
      }

      const product = parseProduct(req.body)
      await db.collection('products').doc(id).update(product)
      return res.status(200).json({ product: { id, ...product } })
    }

    if (req.method === 'DELETE') {
      const id = typeof req.query.id === 'string' ? req.query.id : ''
      if (!/^[A-Za-z0-9_-]{8,}$/.test(id)) {
        return res.status(400).json({ message: 'Invalid product id' })
      }

      await db.collection('products').doc(id).delete()
      return res.status(200).json({ message: 'Product deleted' })
    }

    return res.status(405).json({ message: 'Method not allowed' })
  } catch (error) {
    console.error('Products API error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    const status = message === 'Unauthorized' ? 401 : message.startsWith('Invalid') ? 400 : 500
    return res.status(status).json({ message })
  }
}
