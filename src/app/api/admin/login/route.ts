import { NextRequest, NextResponse } from 'next/server';
import { AuthUtils } from '@/lib/auth';
import { RateLimiter } from '@/lib/rate-limiter';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const clientIP = AuthUtils.getClientIP(request);

    // Check rate limiting
    const rateLimitResult = await RateLimiter.checkRateLimit(clientIP);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many login attempts. Try again later.',
          resetTime: rateLimitResult.resetTime?.toISOString()
        },
        { status: 429 }
      );
    }

    // Validate password
    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // Get the plain password from environment
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD environment variable is not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Verify password (plain text comparison)
    const isValid = password === adminPassword;
    
    if (!isValid) {
      return NextResponse.json(
        { 
          error: 'Invalid password',
          remainingAttempts: rateLimitResult.remainingAttempts - 1
        },
        { status: 401 }
      );
    }

    // Reset rate limit on successful login
    await RateLimiter.resetRateLimit(clientIP);

    // Generate JWT token
    const token = AuthUtils.generateToken('admin', 'admin');

    // Create response with secure cookie
    const response = NextResponse.json(
      { 
        success: true,
        message: 'Login successful'
      },
      { status: 200 }
    );

    // Set secure HTTP-only cookie
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: parseInt(process.env.ADMIN_SESSION_TIMEOUT || '3600000') / 1000,
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
