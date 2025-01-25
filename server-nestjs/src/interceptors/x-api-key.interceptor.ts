import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class XApiKeyInterceptor implements NestInterceptor {
  private config = new ConfigService();
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const req = context.switchToHttp().getRequest();
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) throw new NotFoundException('X-API key not found.');

    if (apiKey !== this.config.getOrThrow('X_API_KEY'))
      throw new UnauthorizedException('Invalid X-API key.');

    return next.handle();
  }
}
