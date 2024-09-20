# Middlewares

Middlewares are functions that are executed before the route handler function. They are used for things like verifying the user's authentication token, uploading files, and more.

In this directory, you'll find the middlewares that are specific to this project.

1. Auth Middleware ( JWT )
2. File Upload Middleware ( Multer )

## 1. Auth Middleware

Let's create a simple middleware that checks if a user is authenticated and assigns them to the `req.user` property:

```typescript
import { ApiError } from "../utils/apiResponse";
import { dbHandler } from "../utils/dbHandler";

export const verifyJWT = dbHandler(async (req, res, next) => {
  const incmoingJwtToken = req.headers.authorization;

  // Check the incmoingJwtToken in valid or not

  if(!isValid) throw new ApiError(400,"Unauthorized request");

  next();
  } catch (error) {
    throw new ApiError(400,"Internal Server Error");
  }
});
```

## 2. File Upload Middleware

Multer is a popular library for handling file uploads in Express.js. It provides a simple and flexible way to handle file uploads, allowing you to easily upload files to a server and save them to disk.

```typescript
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // 1MB limit
});
```

In this middleware, we are using the `diskStorage` option to specify the destination and filename for the uploaded files. We are also using the `upload.single` method to handle a single file upload.
