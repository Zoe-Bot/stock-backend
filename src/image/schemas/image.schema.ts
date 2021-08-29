import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes, Types } from "mongoose";
import { ImageStatus } from "../enums/image-status.enum";

@Schema({ timestamps: true })
export class Image {
    _id: ObjectId
    
    @Prop({ unique: true, required: true })
    uri: string

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
    author: ObjectId

    @Prop()
    resolution: string

    @Prop()
    filesize: number

    @Prop()
    fileformat: string

    @Prop()
    category: string

    @Prop()
    tags: Array<string>

    @Prop({ default: ImageStatus.ACTIVE})
    status: ImageStatus
}

export type ImageDocument = Image & Document
export const ImageSchema = SchemaFactory.createForClass(Image)