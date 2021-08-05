import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/test/:slug/:id')
  testing(@Body() body: any, @Param() params: any, @Query() query) {
    return {
      body,
      params,
      query
    }
  }

}
