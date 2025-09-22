import { NextRequest, NextResponse } from 'next/server';
import { AuthUtils } from '@/lib/auth';

export function middleware(request: NextRequest) {
  // Only apply middleware to admin sub-routes, not the main admin page
  if (request.nextUrl.pathname.startsWith('/admin/') && 
      !request.nextUrl.pathname.startsWith('/api/admin')) {
    
    const token = AuthUtils.getTokenFromRequest(request);
    
    if (!token) {
      // Redirect to main admin page for login
      const url = new URL('/admin', request.url);
      url.searchParams.set('unauthorized', 'true');
      return NextResponse.redirect(url);
    }

    const payload = AuthUtils.verifyToken(token);
    
    if (!payload || payload.role !== 'admin') {
      // Clear invalid token and redirect to admin login
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
    '/admin/:path+', // Only protect admin sub-routes, not /admin itself
    '/api/admin/:path*'
  ]
};
