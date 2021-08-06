import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findbyUsername(username)
        if (user && user.password === pass) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    async register(credentials: CreateUserDto): Promise<any> {
        const result = await this.userService.create(credentials)
        return result
    }

    async login(user: any): Promise<any> {
        console.log(user)
        const payload = {
            username: user.username,
            sub: user.userId
        }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
