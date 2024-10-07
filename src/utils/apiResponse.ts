import type { ZodIssue } from "zod";

/**
 * The ApiError class standardizes the error object providing the consistent structure for error responses used across the application.
 */

export class ApiError extends Error {
  success: false;
  data: null;
  stack?: string;
  message: string;
  errors?: ZodIssue[];
  statuscode: number;

  constructor(code: number, message: string, errors: ZodIssue[] = []) {
    super(message);
    this.message = message;
    this.statuscode = code;
    this.success = false;
    this.data = null;
    if (errors.length > 0) this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * The ApiSuccess class standardizes the success response object providing the consistent structure for success responses used across the application.
 */

export class ApiSuccess<T = unknown> {
  success: true;
  data: T | null;
  message: string;

  constructor(message: string, data: T) {
    this.message = message;
    this.success = true;
    this.data = data;
  }
}
