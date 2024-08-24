import type {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";

export const dbHandler = (requestHandler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      next(error);
    });
  };
};
