import type {
  ApiOperationOptions,
  ApiResponseOptions,
  ApiBodyOptions,
} from '@nestjs/swagger';
import { ConfirmForgotPasswordDto } from 'src/modules/auth/dto/confirm-forgot-password.dto';
import { LoginDto } from 'src/modules/auth/dto/login.dto';

export const AuthSwagger = {
  login: {
    operation: {
      summary: 'User login',
      description:
        'Authenticates a user and returns a JWT token in cookies.',
    } as ApiOperationOptions,
    okResponse: {
      status: 200,
      description: 'User logged in successfully.',
    } as ApiResponseOptions,
    body: {
      description: 'User login credentials',
      type: LoginDto,
    } as ApiBodyOptions,
  },

  logout: {
    operation: {
      summary: 'User logout',
      description:
        'Logs out a user by clearing the JWT token from cookies.',
    } as ApiOperationOptions,
    okResponse: {
      status: 200,
      description: 'User logged out successfully.',
    } as ApiResponseOptions,
  },

  forgotPassword: {
    operation: {
      summary: 'Request password reset',
      description: "Sends a password reset link to the user's email.",
    } as ApiOperationOptions,
    body: {
      schema: {
        properties: {
          email: { type: 'string', example: 'user@example.com' },
        },
      },
    } as ApiBodyOptions,
    okResponse: {
      status: 200,
      description: 'Password reset link sent successfully.',
    } as ApiResponseOptions,
  },

  confirmForgotPassword: {
    operation: {
      summary: 'Confirm password reset',
      description:
        'Resets the password using a token received in email.',
    } as ApiOperationOptions,
    body: {
      type: ConfirmForgotPasswordDto,
    } as ApiBodyOptions,
    okResponse: {
      status: 200,
      description: 'Password reset successfully.',
    } as ApiResponseOptions,
  },

  verifyEmail: {
    operation: {
      summary: 'Verify email',
      description:
        'Verifies user email using the token sent to email.',
    } as ApiOperationOptions,
    body: {
      schema: {
        properties: {
          email: { type: 'string', example: 'user@example.com' },
        },
      },
    } as ApiBodyOptions,
    okResponse: {
      status: 200,
      description: 'Email verified successfully.',
    } as ApiResponseOptions,
  },
} as const;
