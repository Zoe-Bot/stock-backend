import { Controller, Get } from '@nestjs/common';
import { Image } from './image.schema';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Get()
    async findAll(): Promise<Image[]> {
        return this.imageService.findAll()
    }
}
