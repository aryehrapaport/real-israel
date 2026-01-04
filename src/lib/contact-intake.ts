import { z } from "zod";

export const contactIntakeSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || value.length >= 7, {
      message: "Please enter a valid phone number.",
    }),
  location: z.string().trim().optional(),
  timeline: z.string().trim().optional(),
  message: z.string().min(20, "A short message helps us prepare."),
});

export type ContactIntakeValues = z.infer<typeof contactIntakeSchema>;
