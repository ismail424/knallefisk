interface RateLimitEntry {
  attempts: number;
  windowStart: number;
}

interface RateLimitResult {
  allowed: boolean;
  remainingAttempts: number;
  resetTime?: Date;
}

const attemptsByIP = new Map<string, RateLimitEntry>();

export class RateLimiter {
  private static readonly maxAttempts = parseInt(process.env.RATE_LIMIT_MAX_ATTEMPTS || '5');
  private static readonly windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'); // 15 minutes

  static async checkRateLimit(ip: string): Promise<RateLimitResult> {
    const now = Date.now();
    const entry = attemptsByIP.get(ip);

    if (!entry || now - entry.windowStart > this.windowMs) {
      attemptsByIP.set(ip, { attempts: 1, windowStart: now });
      return { allowed: true, remainingAttempts: this.maxAttempts - 1 };
    }

    entry.attempts += 1;

    if (entry.attempts > this.maxAttempts) {
      return {
        allowed: false,
        remainingAttempts: 0,
        resetTime: new Date(entry.windowStart + this.windowMs)
      };
    }

    return { allowed: true, remainingAttempts: this.maxAttempts - entry.attempts };
  }

  static async resetRateLimit(ip: string): Promise<void> {
    attemptsByIP.delete(ip);
  }
}
