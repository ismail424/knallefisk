import { NextRequest, NextResponse } from 'next/server';
import { AuthUtils } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = AuthUtils.getTokenFromRequest(request);
    
    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    const payload = AuthUtils.verifyToken(token);
    
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        authenticated: true,
        user: {
          userId: payload.userId,
          role: payload.role
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}
