import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception-filter/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      //  disableErrorMessages: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = app.get(ConfigService);
  await app.listen(config.get('server.port'));
  console.log(
    'video provider service running on port : ' + config.get('server.port'),
  );
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// //import { DotenvConfigOptions } from 'dotenv';
// import { ConfigService } from '@nestjs/config';

// //dotenv.config();
// //const PORT = process.env.PORT;

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const config = app.get(ConfigService);
//   console.log('connected to port : ' + config.get('server.port'));
//   await app.listen(config.get('server.port'));
// }

// bootstrap();
