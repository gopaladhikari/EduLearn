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
