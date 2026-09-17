"use server";

import { contactSchema } from "@/lib/validation/contact";

export type LeadFormState = {
  status: "idle" | "error" | "success";
  errors: Partial<Record<"name" | "email" | "company" | "teamSize" | "message", string>>;
  message?: string;
  email?: string;
};

export async function requestAccess(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  // Honeypot: bots fill hidden fields, humans don't. Pretend success.
  if (formData.get("website")) {
    return { status: "success", errors: {}, message: "Thanks" };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    teamSize: formData.get("teamSize"),
    message: formData.get("message") || undefined,
  });

  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    return {
      status: "error",
      errors: {
        name: flat.name?.[0],
        email: flat.email?.[0],
        company: flat.company?.[0],
        teamSize: flat.teamSize?.[0],
        message: flat.message?.[0],
      },
      message: "Please fix the highlighted fields.",
    };
  }

  // Demo product: there is no backend. This is where a CRM/email
  // integration would persist the lead.
  await new Promise((r) => setTimeout(r, 600));

  return {
    status: "success",
    errors: {},
    email: parsed.data.email,
  };
}
