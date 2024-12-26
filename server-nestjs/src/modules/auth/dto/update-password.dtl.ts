import { PartialType } from '@nestjs/mapped-types';
import { ConfirmForgotPasswordDto } from './confirm-forgot-password.dto';

export class UpdatePasswordDto extends PartialType(
  ConfirmForgotPasswordDto,
) {}
