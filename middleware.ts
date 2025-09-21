import { NextRequest, NextResponse } from 'next/server';
import { AuthUtils } from '@/lib/auth';

export function middleware(request: NextRequest) {
  // Only apply middleware to admin routes (except login API)
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/api/admin')) {
    
    const token = AuthUtils.getTokenFromRequest(request);
    
    if (!token) {
      // Redirect to admin login page
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      url.searchParams.set('unauthorized', 'true');
      return NextResponse.redirect(url);
    }

    const payload = AuthUtils.verifyToken(token);
    
    if (!payload || payload.role !== 'admin') {
      // Clear invalid token and redirect
      const response = NextResponse.redirect(new URL('/admin', request.url));
      response.cookies.set('admin-token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/'
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ]
};
