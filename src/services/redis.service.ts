import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

interface RedisConfig {
  host: string;
  port: number;
  password: string;
}

@Injectable()
export class RedisService {
  private readonly client: Redis;

  constructor() {
    const config: RedisConfig = {
      host: process.env.REDIS_HOST!,
      port: Number(process.env.REDIS_PORT!),
      password: process.env.REDIS_PASSWORD!,
    };
    this.client = new Redis(config);
  }

  async get(key: string): Promise<any> {
    const value = await this.client.get(key);
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  async set(key: string, value: any): Promise<void> {
    const stringValue =
      typeof value === 'string' ? value : JSON.stringify(value);
    await this.client.set(key, stringValue);
  }
}
