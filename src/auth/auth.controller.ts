import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './local/local-auth.guard';

@Controller('users')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    async register(@Body(ValidationPipe) credentials: RegisterDto): Promise<any> {
        return await this.authService.register(credentials)
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() request): Promise<any> {
        return await this.authService.login(request.user)
    }
}
