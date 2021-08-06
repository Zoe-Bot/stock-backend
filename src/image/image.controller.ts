import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './schemas/image.schema';
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
        return await this.imageService.create(data)
    }

    @Patch("/:id")
    async update(@Body(new ValidationPipe({
        transform: true,
        whitelist: true
    })) data : UpdateImageDto, @Param('id') id: Types.ObjectId) {
        return await this.imageService.update(data, id)
    }

    @HttpCode(204)
    @Delete('/delete/:id')
    async delete(@Param('id') id: Types.ObjectId) {
        return await this.imageService.delete(id)
    }
}
