import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('users')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    async register(@Body(ValidationPipe) credentials: any): Promise<any> {
        return await this.authService.register(credentials)
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Body(ValidationPipe) credentials: any): Promise<any> {
        return await this.authService.login(credentials)
    }
}
