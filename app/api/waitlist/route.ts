import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { firstName, lastName, email } = await request.json();

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) {
    return NextResponse.json(
      { error: "Google Script URL not configured" },
      { status: 500 }
    );
  }

  const res = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to save submission" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
