import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { GoogleAuthGuard } from './google/google-auth.guard';
import { LocalAuthGuard } from './local/local-auth.guard';

@Controller('users')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post()
    async register(@Body(ValidationPipe) credentials: RegisterDto): Promise<any> {
        return await this.authService.register(credentials)
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async jwtLogin(@Request() request): Promise<any> {
        return await this.authService.jwtLogin(request.user)
    }

    @Get('/google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Request() request) { }

    @Get('/google/redirect')
    @UseGuards(GoogleAuthGuard)
    googleAuthRedirect(@Request() request) {
        return this.authService.googleLogin(request)
    }
}
