import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('config/:key')
  getConfig(@Param('key') key: string): string {
    console.log('KEY: ', key);
    return this.appService.getConfig(key);
  }
}
