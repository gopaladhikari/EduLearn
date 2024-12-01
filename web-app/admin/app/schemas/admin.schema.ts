import z from "zod";


export const loginSchema = z.object({
	phoneNumber: z.string().regex(/^\d{10}$/, {
		message: "Invalid phone number",
	}),

});

export const registerSchema = loginSchema.extend({
	fullName: z.string().min(2, "Invalid Full Name"),
	email: z.string().email("Invalid email"),
});

export type RegisterAdmin = z.infer<typeof registerSchema>;
export type LoginAdmin = z.infer<typeof loginSchema>;
