import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
//   console.log('Middleware triggered for:', req.nextUrl.pathname) // Log the requested path

  const token = req.cookies.get('admin-token') // Check for an admin token in cookies
//   console.log('Admin token:', token) // Log the token value (if any)

  if (!token) {
    console.log('No token found. Redirecting to /login') // Log redirection
    return NextResponse.redirect(new URL('/login', req.url))
  }

//   console.log('Token found. Proceeding to the requested page') // Log successful authentication
  return NextResponse.next() // Allow access if authenticated
}

export const config = {
  matcher: ['/admin/:path*'], // Apply middleware to all admin routes
}