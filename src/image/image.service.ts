import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './image.schema';

@Injectable()
export class ImageService {
    constructor(@InjectModel('Image') private imageSchema: Model<ImageDocument>) {}
    
    async findAll(): Promise<Image[]> {
        new this.imageSchema({
            uri: "hello",
            author: "ich",
            resolution: "1200x1200",
            filesize: 180,
            category: "bild",
            tags: ["hübsch", "schön"]
        }).save()

        const images: Image[] = await this.imageSchema.find({})
        return images
    }
}
