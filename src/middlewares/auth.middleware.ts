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
import { Customer } from "../models/customer/customer.model";

export const verifyJWT = dbHandler(async (req, res, next) => {
  const incomingAccessToken = req.headers.authorization?.replace(
    "Bearer ",
    ""
  );

  if (!incomingAccessToken)
    throw new ApiError(401, "Unauthorized request");

  const decoded = verify(incomingAccessToken, env.jwtSecret) as JwtPayload;

  try {
    const user = await Customer.findById(decoded._id);

    if (!user) throw new ApiError(404, "User not found");

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError)
      throw new ApiError(400, "Token has expired");

    if (error instanceof NotBeforeError)
      throw new ApiError(400, "Token not yet valid");

    if (error instanceof JsonWebTokenError)
      throw new ApiError(400, "Malformed token");

    throw new ApiError(400, "Internal Server Error");
  }
});
