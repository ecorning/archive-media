import { NextResponse } from "next/server";
import { google } from "googleapis";

const WAITLIST_SHEET_ID = "10nCKyHJrNUqqKvjI6tbkz1amXnF_iQyioEiHbgataFM";

export async function POST(request: Request) {
  const { firstName, lastName, email } = await request.json();

  if (!firstName || !lastName || !email) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: WAITLIST_SHEET_ID,
      range: "Waitlist!A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[new Date().toISOString(), firstName, lastName, email]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Sheets API error:", err);
    return NextResponse.json(
      { error: "Failed to save submission" },
      { status: 500 }
    );
  }
}
