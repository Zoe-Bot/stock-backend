import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { ObjectId, Types } from 'mongoose';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './schemas/image.schema';
import { ImageService } from './image.service';
import { query } from 'express';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Get()
    async findAll(): Promise<Image[]> {
        return this.imageService.findAll()
    }

    @Get('/:id')
    async findOneById(@Param('id') id: ObjectId): Promise<Image> {
        return this.imageService.findOneById(id)
    }

    @Post() 
    async create(@Body(new ValidationPipe({
        transform: true,
        whitelist: true
    })) data: CreateImageDto): Promise<Image> {
        return await this.imageService.create(data)
    }

    @Patch('/:id')
    async update(@Body(new ValidationPipe({
        transform: true,
        whitelist: true
    })) data : UpdateImageDto, @Param('id') id: ObjectId): Promise<Image> {
        return await this.imageService.update(data, id)
    }

    @HttpCode(204)
    @Delete('/:id')
    async delete(@Param('id') id: ObjectId, @Query() query: any): Promise<void> {
        return await this.imageService.delete(id, query.type)
    }
}
