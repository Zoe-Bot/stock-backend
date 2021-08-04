import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageController } from './image/image.controller';
import { ImageModule } from './image/image.module';

@Module({
  imports: [ImageModule],
  controllers: [AppController, ImageController],
  providers: [AppService],
})
export class AppModule {}
