# Utils

This folder contains utility functions that are used across the application.

1. [dbHandler()](#1-dbhandler)
2. [ApiError](#2-apierror)
3. [ApiSuccess](#3-apisuccess)

---

## 1. dbHandler()

The dbHandler is a higher-order function designed to simplify error handling in Express.js route handlers. It wraps a given RequestHandler (an Express middleware function) in a Promise, allowing for easier management of errors in asynchronous code.

### Parameters:

- requestHandler: A function that handles the incoming request, following the standard Express middleware signature (req, res, next). This function can be synchronous or asynchronous.

### Purpose

- It eliminates the need for repetitive try/catch blocks in every route handler.

- This approach ensures that all errors, whether synchronous or asynchronous, are consistently caught and passed to the next middleware in the Express pipeline for centralized error handling.

## Code

```typescript
import { ApiError } from "./apiResponse";
import type {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";

export const dbHandler = (requestHandler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      requestHandler(req, res, next);
    } catch (error) {
      console.error(error);
      res.status(500).json(new ApiError((error as Error).message));
    }
  };
};
```

### Example

```typescript
import { dbHandler } from "../utils/dbHandler";

const someController = dbHandler(async (req, res, next) => {
  // Your route handler logic here without try/catch
});
```

---

## 2. ApiError

The **ApiError** class standardizes the error object providing the consistent structure for error responses used across the application.

### Parameters:

- message: A string representing the error message.

### Purpose

- It provides a consistent structure for error responses, including an error message, a success flag set to false, and an optional stack trace.

- It is designed for use across the application to ensure that all error responses are handled uniformly, making it easier to manage errors in any part of the application.

### Example

```typescript
import { ApiError } from "../utils/apiResponse";

try {
  // Some code that may throw an error
} catch (error) {
  throw new ApiError(400, "Error message");
}
```

---

## 3. ApiSuccess

The **ApiSuccess** class standardizes the success response object providing the consistent structure for success responses used across the application.

### Parameters:

- message: A string representing the success message.
- data: An object containing the data associated with the success response.

### Purpose

- It provides a consistent structure for success responses, including a success flag set to true, a message, and optional data.

- It is designed for use across the application to ensure that all success responses follow the same format, simplifying the handling and display of successful outcomes.

### Example

```typescript
import { ApiSuccess } from "../utils/
apiResponse";

function handler(req, res) {
  try {
    // some operations
    return res.json(new ApiSuccess("Success message", data));
  } catch (error) {
    // Handle the error as an ApiError
  }
}
```
