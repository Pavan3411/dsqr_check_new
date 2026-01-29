import { google } from "googleapis";

export async function POST(req) {
  try {
    const body = await req.json();
    const { sheetName = "Sheet1", ...fields } = body;

    // Google Auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: process.env.GOOGLE_TYPE,
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    console.log(process.env.GOOGLE_PROJECT_ID);


    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Row values (all fields in order + timestamp)
    const values = [...Object.values(fields), new Date().toLocaleString()];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:Z`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [values] },
    });

    return new Response(
      JSON.stringify({ success: true, message: "Form submitted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Google Sheets API Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error submitting form" }),
      { status: 500 }
    );
  }
}
