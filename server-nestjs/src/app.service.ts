import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck() {
    return {
      status: 'ok',
      message: 'Server is up and running',
      timestamp: new Date().toDateString(),
    };
  }
}
