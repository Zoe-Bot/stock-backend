import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Image {

    id?: Types.ObjectId
    
    @Prop({ unique: true })
    uri: string

    @Prop()
    author: string

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
}

export type ImageDocument = Image & Document
export const ImageSchema = SchemaFactory.createForClass(Image)