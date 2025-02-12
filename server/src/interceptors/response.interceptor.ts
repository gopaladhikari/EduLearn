import {
  Injectable,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ServiceReturnType {
  message: string;
  data: unknown;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  responseHandler(res: ServiceReturnType, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const statusCode = response.statusCode;

    return {
      status: true,
      path: request.url,
      statusCode,
      message: res.message,
      data: res.data,
    };
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next
      .handle()
      .pipe(map((res) => this.responseHandler(res, context)));
  }
}
