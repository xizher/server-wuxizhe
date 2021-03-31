import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('ttt')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('cat')
  getHello(): string {
    return this.appService.getHello();
  }
}
