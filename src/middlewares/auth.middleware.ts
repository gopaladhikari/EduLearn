import { ApiError } from "../utils/apiResponse";
import {
  JsonWebTokenError,
  JwtPayload,
  NotBeforeError,
  TokenExpiredError,
  verify,
} from "jsonwebtoken";
import { env } from "../config/env";
import { dbHandler } from "../utils/dbHandler";
import { User } from "../models/user.model";

export const verifyJWT = dbHandler(async (req, res, next) => {
  const incomingAccessToken = req.headers.authorization?.replace(
    "Bearer ",
    ""
  );

  if (!incomingAccessToken) throw new ApiError("Unauthorized request");

  const decoded = verify(incomingAccessToken, env.jwtSecret) as JwtPayload;

  try {
    const user = await User.findById(decoded._id);

    if (!user) throw new ApiError("User not found");

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError)
      throw new ApiError("Token has expired");

    if (error instanceof NotBeforeError)
      throw new ApiError("Token not yet valid");

    if (error instanceof JsonWebTokenError)
      throw new ApiError("Malformed token");

    throw new ApiError("Internal Server Error");
  }
});
