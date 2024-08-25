import { z } from "zod";

export const categorySchema = z.object({
  categoryName: z.string({
    required_error: "Category name is required",
  }),
  categoryImage: z.string({
    required_error: "Category image is required",
  }),
});
