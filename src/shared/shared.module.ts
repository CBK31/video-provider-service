import { Module } from '@nestjs/common';
import { AuthenticationGuard } from './guards/authentication.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, videoModel } from '../video/schemas/video.schema';

@Module({
  controllers: [],
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: videoModel }]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('secret.JWTsecretKey'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  providers: [AuthenticationGuard],
  exports: [
    AuthenticationGuard,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('secret.JWTsecretKey'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
    MongooseModule.forFeature([{ name: Video.name, schema: videoModel }]),
  ],
})
export class SharedModule {}
