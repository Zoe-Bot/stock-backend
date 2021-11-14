import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImageStatus } from './enums/image-status.enum';
import { Image, ImageDocument } from './schemas/image.schema';

@Injectable()
export class ImageService {
    constructor(@InjectModel('Image') private imageSchema: Model<ImageDocument>) { }

    /**
     * Find all Images
     * @returns an Array of all Images
     */
    async findAll(): Promise<Image[]> {
        const images: Image[] = await this.imageSchema.find({})
        return images
    }

    /**
     * Find one Image by ID
     * @param id of the image
     * @returns the Image
     */
    async findOneById(id: ObjectId): Promise<Image> {
        const image: Image = await this.imageSchema.findById(id)
        return image
    }

    /**
     * Create new Image
     * @param data for the Image
     * @returns the created Image
     */
    async create(data: CreateImageDto): Promise<Image> {
        try {
            const image = new this.imageSchema({
                ...data
            })
            const result = await image.save()

            return result
        } catch (error) {
            if (error.code === 11000)
                throw new ConflictException('uri must be unique')
            else
                throw new InternalServerErrorException()
        }
    }

    /**
     * Updates data of an Image
     * @param data to update
     * @param id of the Image
     * @returns updated Image
     */
    async update(data: UpdateImageDto, id: ObjectId): Promise<Image> {
        try {
            const image = await this.imageSchema.findByIdAndUpdate(id, data, {
                new: true
            })

            return image
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    /**
     * Delete Image Soft or Hard
     * @param id of the Image
     * @param type delete type, hard --> Hard delete, everything else --> Soft delete
     * @returns void
     */
    async delete(id: ObjectId, type: string): Promise<void> {
        const isHarddelete = (type == 'hard' ? true : false)

        if (isHarddelete) {
            try {
                const result = await this.imageSchema.findByIdAndDelete(id)
                
                if (!result)
                    throw new NotFoundException()

                return
            } catch (e) {
                throw new InternalServerErrorException()
            }
        }

        try {
            const image = await this.imageSchema.findByIdAndUpdate(id, {
                status: ImageStatus.DELETED
            })

            if (!image)
                throw new NotFoundException()

            return
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }
}
