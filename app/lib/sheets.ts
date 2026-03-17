import { google } from "googleapis";

const SHEET_ID = "1zJz3NmvicW7mPqa6rtfQ2CPb3Aw_6EpyreFu8Gx6afM";
const RANGE = "'Pivot'!A:A";

export async function getGuestNames(): Promise<string[]> {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: RANGE,
  });

  const rows = res.data.values;
  if (!rows || rows.length === 0) return [];

  const names: string[] = [];

  // Skip header row (index 0), take all non-empty names from column A
  for (let i = 1; i < rows.length; i++) {
    const name = (rows[i]?.[0] || "").trim();
    if (name) {
      names.push(name);
    }
  }

  return [...new Set(names)].sort((a, b) => a.localeCompare(b));
}
