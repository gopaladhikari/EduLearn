import z from "zod";
import { registerSchema } from "./userSchema";

export const customerDetailsSchema = registerSchema.extend({
  password: z.string().min(6, "Invalid password"),
});
