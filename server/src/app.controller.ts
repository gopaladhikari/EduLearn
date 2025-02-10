import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      message: 'Hello World!',
      data: null,
    };
  }

  @Get('health')
  healthCheck() {
    return {
      message: 'Server is up and running',
      data: null,
    };
  }
}
