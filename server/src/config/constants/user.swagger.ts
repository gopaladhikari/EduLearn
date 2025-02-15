import type {
  ApiOperationOptions,
  ApiParamOptions,
  ApiResponseOptions,
  ApiQueryOptions,
} from '@nestjs/swagger';
import {
  UserQueryExampleDto,
  UserResponseDto,
} from 'src/modules/users/dto/user-example.dto';
import { USERS_MESSAGES } from '../messages';

export const UsersSwagger = {
  getAllUsers: {
    operation: {
      summary: 'Get all users (Admin only)',
    } as ApiOperationOptions,

    query: {
      name: 'query',
      description: 'Filter users by query',
      required: false,
      type: UserQueryExampleDto,
    } as ApiQueryOptions,

    okResponse: {
      description: 'List of users retrieved successfully',
      type: UserResponseDto,
      isArray: true,
    } as ApiResponseOptions,
  },

  getCurrentUser: {
    operation: {
      summary: 'Get current authenticated user',
    } as ApiOperationOptions,
    okResponse: {
      description: 'User details retrieved successfully',
      type: UserResponseDto,
    } as ApiResponseOptions,
  },

  createUser: {
    operation: {
      summary: 'Create a new user',
    } as ApiOperationOptions,
    createdResponse: {
      description: USERS_MESSAGES.CREATE_SUCCESS,
      type: UserResponseDto,
    } as ApiResponseOptions,
    badRequestResponse: {
      description: 'Invalid file format or missing fields',
    } as ApiResponseOptions,
    forbiddenResponse: {
      description: 'Admin access required',
    } as ApiResponseOptions,
  },

  updateUser: {
    operation: {
      summary: 'Update user profile information',
    } as ApiOperationOptions,
    paramId: {
      name: 'id',
      description: 'MongoDB ObjectID',
      example: '65f8d7e4c4b5d12a5c3e4f5a',
    } as ApiParamOptions,
    consumes: 'multipart/form-data',
    okResponse: {
      description: USERS_MESSAGES.UPDATE_SUCCESS,
      type: UserResponseDto,
    } as ApiResponseOptions,
    badRequestResponse: {
      description: 'Invalid file format or missing fields',
    } as ApiResponseOptions,
    forbiddenResponse: {
      description: 'Admin access required',
    } as ApiResponseOptions,
  },

  updatePassword: {
    operation: {
      summary: 'Update user password',
    } as ApiOperationOptions,

    okResponse: {
      description: USERS_MESSAGES.UPDATE_SUCCESS,
      type: UserResponseDto,
    } as ApiResponseOptions,
  },
} as const;
