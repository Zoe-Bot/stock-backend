import { Controller, Delete, Get, NotFoundException, Param, Post, Request, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JWTAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Role } from 'src/auth/roles/role.enum';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { UserService } from './user.service';

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
        if(!profile)
            throw new NotFoundException()

        return profile
    }

    @UseGuards(JWTAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Delete('/:username')
    async deleteUser(@Param('username') username: string): Promise<any> {
        return await this.userService.deleteUser(username)
    }
}
