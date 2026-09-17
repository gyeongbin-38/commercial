import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/contact";

/**
 * Demo lead endpoint for the fictional Orbit product.
 * Validates the payload and returns a deterministic reference.
 * No data is persisted or emailed; wire a provider (e.g. Resend)
 * here when turning the concept into a real service.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { form: "Malformed request body." } },
      { status: 400 },
    );
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = issue.message;
    }
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const reference = `ORB-${Math.abs(
    [...result.data.email].reduce((a, c) => a + c.charCodeAt(0), 0) % 10000,
  )
    .toString()
    .padStart(4, "0")}`;

  return NextResponse.json({ ok: true, reference });
}
