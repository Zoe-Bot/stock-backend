import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './image/image.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017'), ImageModule, UserModule, AuthModule, ConfigModule.forRoot({
    envFilePath: '.development.env',
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
