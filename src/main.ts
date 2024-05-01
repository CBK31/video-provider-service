import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { DotenvConfigOptions } from 'dotenv';
import { ConfigService } from '@nestjs/config';

//dotenv.config();
//const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  console.log('connected to port : ' + config.get('server.port'));
  await app.listen(config.get('server.port'));
}

bootstrap();
