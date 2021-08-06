import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './schemas/user.schema';

export type User = any;

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userSchema: Model<UserDocument>) {}

    async create(credentials: CreateUserDto): Promise<User> {
        try {
            const user = new this.userSchema({
                ...credentials
            })
            const result = await user.save()

            return result
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    async findbyUsername(username: string): Promise<User | undefined> {
        return await this.userSchema.findOne({ username }).lean()
    }
}
