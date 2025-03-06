import {
  Injectable,
  NotFoundException,
  SetMetadata,
  UnauthorizedException,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class XApiKeyInterceptor implements NestInterceptor {
  constructor(
    private readonly config = new ConfigService(),
    private readonly reflector: Reflector,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return next.handle();
    }

    const req = context.switchToHttp().getRequest();

    const isOAuthRoute = req.path.includes('/auth/google');

    if (isOAuthRoute) return next.handle();

    const apiKey = req.headers['x-api-key'];

    if (!apiKey) throw new NotFoundException('X-API key not found.');

    if (apiKey !== this.config.getOrThrow('X_API_KEY'))
      throw new UnauthorizedException('Invalid X-API key.');

    return next.handle();
  }
}
