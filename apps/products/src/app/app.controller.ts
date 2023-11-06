import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthGuard } from '../guards/AuthGuard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard)
  getData(@Req() request) {
    return this.appService.getData(request.user);
  }
}
