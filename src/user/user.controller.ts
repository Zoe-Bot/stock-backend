import { Body, Controller, Get, NotFoundException, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(JWTAuthGuard)
    async getUser(@Request() req): Promise<any> {
        return 
    }

    @Get('/profile/:username')
    async getProfile(@Param('username') username: string): Promise<any> {
        const profile = await this.userService.findbyUsername(username)
        console.log(profile)
        if(!profile)
            throw new NotFoundException()

        return profile
    }

    @Post()
    async create(@Body() credentials: CreateUserDto): Promise<User> {
        return this.userService.create(credentials)
    }
}
