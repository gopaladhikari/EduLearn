import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Hello world')
@ApiSecurity('x-api-key')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Get hello message' })
  @ApiOkResponse({
    description: 'Successfully get hello message',
    example: {
      message: 'Hello World!',
      data: null,
    },
  })
  getHello() {
    return {
      message: 'Hello World!',
      data: null,
    };
  }
  @ApiOperation({ summary: 'Get hello message' })
  @ApiOkResponse({
    description: 'Successfully get hello message',
    example: {
      message: 'Server is up and running',
      data: null,
    },
  })
  @Get('health')
  healthCheck() {
    return {
      message: 'Server is up and running',
      data: null,
    };
  }
}
