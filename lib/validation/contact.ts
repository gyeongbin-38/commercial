import { z } from "zod";

export const TEAM_SIZES = ["just-me", "2-5", "6-15", "16+"] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .email("That email address does not look right."),
  company: z
    .string()
    .trim()
    .min(2, "Please enter your business or studio name.")
    .max(120, "Business name is too long."),
  teamSize: z.enum(TEAM_SIZES, {
    message: "Please pick a team size.",
  }),
  message: z.string().trim().max(1200, "Please keep it under 1,200 characters.").optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const TEAM_SIZE_LABELS: Record<(typeof TEAM_SIZES)[number], string> = {
  "just-me": "Just me",
  "2-5": "2 to 5",
  "6-15": "6 to 15",
  "16+": "16 or more",
};
