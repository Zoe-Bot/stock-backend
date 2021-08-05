import { Body, Controller, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './image.schema';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Get()
    async findAll(): Promise<Image[]> {
        return this.imageService.findAll()
    }

    @Post() 
    async create(@Body(new ValidationPipe({
        transform: true,
        whitelist: true
    })) data: CreateImageDto) {
        return this.imageService.create(data)
    }

    @Patch("/:uri")
    async update(@Body(new ValidationPipe({
        transform: true,
        whitelist: true
    })) data : UpdateImageDto, @Param('uri') uri: string) {
        return this.imageService.update(data, uri)
    }

}
