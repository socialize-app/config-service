import { Controller } from '@nestjs/common';
import {
  EventPattern,
  Payload,
  Ctx,
  RmqContext,
  MessagePattern,
} from '@nestjs/microservices';
import { RedisService } from '../services/redis.service';

@Controller()
export class ConfigController {
  constructor(private readonly redisService: RedisService) {}

  @EventPattern('set')
  async set(
    @Payload() data: { key: string; value: any },
    @Ctx() context: RmqContext,
  ) {
    console.log('Setting key:', data.key, 'with value:', data.value);
    await this.redisService.set(data.key, data.value);
  }

  @MessagePattern({ cmd: 'get' })
  async get(key: string): Promise<any> {
    console.log('Getting key:', key);
    const value = await this.redisService.get(key);
    return value ?? null;
  }
}
