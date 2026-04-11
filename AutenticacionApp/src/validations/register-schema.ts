import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must have at least 3 characters.")
    .max(60, "Full name must have at most 60 characters."),
  email: z.email("Enter a valid email address."),
  password: z
    .string()
    .min(6, "Password must have at least 6 characters.")
    .max(64, "Password must have at most 64 characters."),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
