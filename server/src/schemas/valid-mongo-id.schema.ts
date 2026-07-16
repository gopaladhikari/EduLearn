import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const validMongoIdSchema = (key: string) => {
  return z.object({
    [key]: z.string().refine((id) => isValidObjectId(id), {
      message: "Invalid MongoDB ObjectId",
    }),
  });
};
