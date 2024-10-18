import z from "zod";

export const notificationSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),

  message: z.string({
    required_error: "Message is required",
  }),

  isRead: z
    .boolean({
      required_error: "Is read is required",
    })
    .default(false),
});
