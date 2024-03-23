import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const port = Number(process.env.CONFIG_SERVICE_PORT);
  if (!port) {
    throw new Error('Port is not defined in .env file');
  }

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port,
      },
    },
  );

  await app.listen();
}

bootstrap();
