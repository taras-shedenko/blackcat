import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('add')
  add(
    @Query('v1', ParseIntPipe) v1: number,
    @Query('v2', ParseIntPipe) v2: number,
  ) {
    return this.appService.add({ v1, v2 });
  }

  @Get('multi')
  multi(
    @Query('v1', ParseIntPipe) v1: number,
    @Query('v2', ParseIntPipe) v2: number,
  ) {
    return this.appService.multi({ v1, v2 });
  }

  @Get('sub')
  sub(
    @Query('v1', ParseIntPipe) v1: number,
    @Query('v2', ParseIntPipe) v2: number,
  ) {
    return this.appService.sub({ v1, v2 });
  }

  @Get('divide')
  divide(
    @Query('v1', ParseIntPipe) v1: number,
    @Query('v2', ParseIntPipe) v2: number,
  ) {
    return this.appService.divide({ v1, v2 });
  }
}
