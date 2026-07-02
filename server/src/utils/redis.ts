import { Redis } from "ioredis";

const redisUrl = process.env.REDIS_URL;

class CacheService {
  private readonly redis: Redis;

  constructor() {
    this.redis = new Redis(redisUrl as string, {
      keyPrefix: "edulearn:",

      retryStrategy(times) {
        if (times > 5) return;
        return Math.min(times * 50, 2000);
      },
    });

    this.registerEvents();
  }

  private registerEvents() {
    this.redis.on("connect", () => {
      console.log("Redis connected");
    });

    this.redis.on("error", (error) => {
      console.error("Redis error:", error);
    });

    this.redis.on("reconnecting", () => {
      console.log("Redis reconnecting...");
    });

    this.redis.on("end", () => {
      console.log("Redis connection ended");
    });
  }

  private get isReady() {
    return this.redis.status === "ready";
  }

  async exists(key: string): Promise<boolean> {
    if (!this.isReady) return false;

    try {
      const result = await this.redis.exists(key);
      return result === 1;
    } catch (error) {
      console.error("Redis EXISTS failed:", error);
      return false;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.isReady) return null;

    try {
      const value = await this.redis.get(key);

      if (!value) return null;

      return JSON.parse(value) as T;
    } catch (error) {
      console.error("Redis GET failed:", error);
      return null;
    }
  }

  async set(key: string, value: unknown, ttl = 3600): Promise<void> {
    if (!this.isReady) return;

    try {
      const payload = JSON.stringify(value);

      await this.redis.set(key, payload, "EX", ttl);
    } catch (error) {
      console.error("Redis SET failed:", error);
    }
  }

  async del(key: string): Promise<void> {
    if (!this.isReady) return;

    try {
      await this.redis.del(key);
    } catch (error) {
      console.error("Redis DEL failed:", error);
    }
  }

  async flush(): Promise<void> {
    if (!this.isReady) return;

    try {
      await this.redis.flushdb();
    } catch (error) {
      console.error("Redis FLUSH failed:", error);
    }
  }

  get client() {
    return this.redis;
  }
}

export const cache = new CacheService();
