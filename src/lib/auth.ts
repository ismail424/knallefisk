import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export interface AuthPayload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

export class AuthUtils {
  private static readonly JWT_SECRET = process.env.JWT_SECRET!;
  private static readonly SESSION_TIMEOUT = parseInt(process.env.ADMIN_SESSION_TIMEOUT || '3600000'); // 1 hour

  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateToken(userId: string, role: string = 'admin'): string {
    const payload = {
      userId,
      role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (this.SESSION_TIMEOUT / 1000)
    };

    return jwt.sign(payload, this.JWT_SECRET, { algorithm: 'HS256' });
  }

  static verifyToken(token: string): AuthPayload | null {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as AuthPayload;
      
      // Check if token is expired
      if (decoded.exp * 1000 < Date.now()) {
        return null;
      }

      return decoded;
    } catch {
      return null;
    }
  }

  static getTokenFromRequest(request: NextRequest): string | null {
    // Try to get token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    // Try to get token from cookies
    const cookieToken = request.cookies.get('admin-token')?.value;
    if (cookieToken) {
      return cookieToken;
    }

    return null;
  }

  static getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    
    if (realIP) {
      return realIP;
    }
    
    return '127.0.0.1';
  }
}
