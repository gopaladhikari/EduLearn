import type {
  ApiOperationOptions,
  ApiQueryOptions,
  ApiParamOptions,
  ApiResponseOptions,
  ApiBodyOptions,
} from '@nestjs/swagger';
import {
  CourseQueryExampleDto,
  CourseResponseDto,
} from 'src/modules/courses/dto/example-courses.dto';
import { COURSES_MESSAGES } from '../messages';

export const CoursesSwagger = {
  getAllCourses: {
    operation: {
      summary: 'Get paginated list of all courses',
    } as ApiOperationOptions,
    okResponse: {
      description: 'List of courses retrieved successfully',
      type: CourseResponseDto,
      isArray: true,
    } as ApiResponseOptions,

    query: {
      name: 'query',
      description: 'Filter courses by query',
      required: false,
      type: CourseQueryExampleDto,
    },
  },

  searchCourses: {
    operation: {
      summary: 'Search courses by title or description',
    } as ApiOperationOptions,
    queryQ: {
      name: 'q',
      description: 'Search query',
      example: 'web development',
    } as ApiQueryOptions,
    queryLimit: {
      name: 'limit',
      type: Number,
      example: 10,
    } as ApiQueryOptions,
    querySkip: {
      name: 'skip',
      type: Number,
      example: 0,
    } as ApiQueryOptions,
    okResponse: {
      description: 'Search results matching query',
      type: CourseResponseDto,
      isArray: true,
    } as ApiResponseOptions,
  },

  getCourseBySlug: {
    operation: {
      summary: 'Get course details by slug',
    } as ApiOperationOptions,
    paramSlug: {
      name: 'slug',
      example: 'introduction-to-web-development',
    } as ApiParamOptions,
    okResponse: {
      description: COURSES_MESSAGES.FETCH_BY_SLUG_SUCCESS,
      type: CourseResponseDto,
    } as ApiResponseOptions,
    notFoundResponse: {
      description: 'Course not found',
    } as ApiResponseOptions,
  },

  createCourse: {
    operation: {
      summary: 'Create a new course (Admin only)',
    } as ApiOperationOptions,
    consumes: 'multipart/form-data',
    createdResponse: {
      description: COURSES_MESSAGES.CREATED_SUCCESS,
      type: CourseResponseDto,
    } as ApiResponseOptions,
    badRequestResponse: {
      description: 'Invalid file format or missing fields',
    } as ApiResponseOptions,
    forbiddenResponse: {
      description: 'Admin access required',
    } as ApiResponseOptions,
  },

  toggleCoursePublish: {
    operation: {
      summary: 'Toggle course publish status (Admin only)',
    } as ApiOperationOptions,
    paramId: {
      name: 'id',
      description: 'MongoDB ObjectID',
      example: '65f8d7e4c4b5d12a5c3e4f5a',
    } as ApiParamOptions,

    okResponse: {
      description: 'Course published successfully',
      type: CourseResponseDto,
    },
  },

  removeAll: {
    operation: {
      summary: 'Delete multiple courses (Admin only)',
    } as ApiOperationOptions,
    body: {
      description: 'Array of course IDs to delete',
      schema: {
        example: {
          ids: [
            '65f8d7e4c4b5d12a5c3e4f5a',
            '65f8d7e4c4b5d12a5c3e4f5b',
          ],
        },
      },
    } as ApiBodyOptions,
    okResponse: {
      description: COURSES_MESSAGES.DELETE_SUCCESS,
      example: {
        message: COURSES_MESSAGES.DELETE_SUCCESS,
        data: null,
      },
    } as ApiResponseOptions,
    badRequestResponse: {
      description: 'Invalid IDs provided',
    } as ApiResponseOptions,
  },

  remove: {
    operation: {
      summary: 'Delete a course (Admin only)',
    } as ApiOperationOptions,
    paramId: {
      name: 'id',
      description: 'Course id',
    } as ApiParamOptions,
    okResponse: {
      description: COURSES_MESSAGES.DELETE_SUCCESS,
      example: {
        message: COURSES_MESSAGES.DELETE_SUCCESS,
        data: null,
      },
    } as ApiResponseOptions,
    notFoundResponse: {
      description: COURSES_MESSAGES.NOT_FOUND,
    } as ApiResponseOptions,
  },
} as const;
