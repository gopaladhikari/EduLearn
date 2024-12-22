import {
  createParamDecorator,
  type ExecutionContext,
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const currentUser = context.switchToHttp().getRequest().user;

    return currentUser;
  },
);
