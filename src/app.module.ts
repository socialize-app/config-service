import { Module } from '@nestjs/common';
import { ConfigController } from './controllers/config.controller';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from './services/redis.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [ConfigController],
  providers: [RedisService],
})
export class AppModule {}
