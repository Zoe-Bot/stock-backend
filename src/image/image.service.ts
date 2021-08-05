import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, Types } from 'mongoose';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image, ImageDocument } from './image.schema';

@Injectable()
export class ImageService {
    constructor(@InjectModel('Image') private imageSchema: Model<ImageDocument>) {}
    
    async findAll(): Promise<Image[]> {
        const images: Image[] = await this.imageSchema.find({})
        return images
    }

    async create(data: CreateImageDto) {
        try {
            const image = new this.imageSchema({
                ...data
            })
            const result = await image.save()

            return result
        } catch(error) {
            if(error.code === 11000)
                throw new ConflictException('uri must be unique')
            else
                throw new InternalServerErrorException()
        }
    }

    async update(data: UpdateImageDto, id: Types.ObjectId) {
        try {
            const image = await this.imageSchema.findByIdAndUpdate(id, data, {
                new: true
            })

            console.log(image.id)

            return image
        } catch(error) {
            throw new InternalServerErrorException()
        }
    }

    async delete(id: Types.ObjectId) {
        const result = await this.imageSchema.findByIdAndDelete(id)

        if (result === null)
            throw new NotFoundException()

        return {
            result
        }
    }
}
