import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
// tester tester
async function bootstqarap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
