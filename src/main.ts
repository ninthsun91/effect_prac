import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { Effect, Console } from 'effect';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  Effect.runSync(Console.log('Server running on', app.getHttpServer().address()));
}
bootstrap();
