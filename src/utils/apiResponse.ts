/**
 * The ApiError class standardizes the error object providing the consistent structure for error responses used across the application.
 */

export class ApiError extends Error {
  success: false;
  data: null;
  stack?: string;

  constructor(message: string, stack = "") {
    super(message);
    this.success = false;
    this.data = null;

    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
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
