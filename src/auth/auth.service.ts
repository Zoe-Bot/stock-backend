import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findbyUsername(username)
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    async register(credentials: RegisterDto): Promise<any> {
        const result = await this.userService.create(credentials)
        return result
    }

    async login(user: any): Promise<any> {
        const payload = {
            role: user.role,
            username: user.username,
            sub: user._id
        }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
