import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "src/auth/roles/role.enum";

@Schema({ timestamps: true })
export class User {
    @Prop({ unique: true, required: true})
    username: string

    @Prop({ unique: true, required: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop( {required: true })
    role: string
}

export const UserSchema = SchemaFactory.createForClass(User)
export type UserDocument = User & Document

