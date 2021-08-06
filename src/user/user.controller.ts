import { Body, Controller, Get, NotFoundException, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User, UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(JWTAuthGuard)
    async getUser(@Request() req): Promise<any> {
        return req.user
    }

    @Get('/profile/:username')
    async getProfile(@Param('username') username: string): Promise<any> {
        const profile = await this.userService.findbyUsername(username)
        console.log(profile)
        if(!profile)
            throw new NotFoundException()

        return profile
    }
}
