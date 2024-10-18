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
      console.log(error);
      if (error instanceof ApiError)
        return res.status(error.statuscode).json(error);
      res.status(500).json(new ApiError(500, (error as Error).message));
    }
  };
};
