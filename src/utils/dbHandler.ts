import { ApiError } from "./apiResponse";
import type {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";

export const dbHandler = (requestHandler: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      console.error("Server error", error);
      res.status(500).json(new ApiError((error as Error).message));
    }
  };
};
