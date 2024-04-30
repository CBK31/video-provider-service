import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
async function bootstrassp() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
