import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserGuard } from './user.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/profile')
    @UseGuards(UserGuard)
    profile() {
        return this.userService.profile()
    }
}
