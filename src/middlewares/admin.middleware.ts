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
import { Admin } from "../models/admin/admin.model";

export const verifyAdmin = dbHandler(async (req, res, next) => {
  const incomingAccessToken = req.headers.authorization?.replace(
    "Bearer ",
    ""
  );

  if (!incomingAccessToken)
    throw new ApiError(401, "Unauthorized request");

  const decoded = verify(incomingAccessToken, env.jwtSecret) as JwtPayload;

  try {
    const admin = await Admin.findById(decoded._id);

    if (!admin) throw new ApiError(404, "Admin not found");

    req.user = admin;

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
