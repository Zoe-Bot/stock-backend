import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt'

export type User = any;

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userSchema: Model<UserDocument>) {}

    async create(credentials: RegisterDto): Promise<User> {
        try {
            const hash = await bcrypt.hash(credentials.password, 12)
            const user = new this.userSchema({
                ...credentials,
                password: hash
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
