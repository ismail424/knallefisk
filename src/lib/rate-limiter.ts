import { RateLimiterMemory } from 'rate-limiter-flexible';

export class RateLimiter {
  private static readonly maxAttempts = parseInt(process.env.RATE_LIMIT_MAX_ATTEMPTS || '5');
  private static readonly windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'); // 15 minutes

  private static limiter = new RateLimiterMemory({
    points: this.maxAttempts, // Number of attempts
    duration: Math.floor(this.windowMs / 1000), // Per X seconds
    blockDuration: Math.floor(this.windowMs / 1000), // Block for X seconds
  });

  static async checkRateLimit(ip: string): Promise<{ allowed: boolean; remainingAttempts: number; resetTime?: Date }> {
    try {
      const result = await this.limiter.consume(ip);
      return {
        allowed: true,
        remainingAttempts: result.remainingPoints || 0
      };
    } catch (rateLimiterRes: unknown) {
      const resetTime = new Date(Date.now() + this.windowMs);
      if (rateLimiterRes && typeof rateLimiterRes === 'object' && 'msBeforeNext' in rateLimiterRes) {
        const msBeforeNext = (rateLimiterRes as { msBeforeNext: number }).msBeforeNext;
        resetTime.setTime(Date.now() + msBeforeNext);
      }
      return {
        allowed: false,
        remainingAttempts: 0,
        resetTime
      };
    }
  }

  static async resetRateLimit(ip: string): Promise<void> {
    try {
      await this.limiter.delete(ip);
    } catch {
      // Ignore errors when resetting
    }
  }
}
