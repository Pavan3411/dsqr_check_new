import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  try {
    const {
      name,
      phone,
      email,
      instagram,
      city,
      contactMethod,
      role,
      contentType,
      monthlyNeed,
      currentHandling,
      turnaround,
      inspiration,
      budget,
      startTime,
      website,
      comments,
    } = req.body;

    // Load Google credentials
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: process.env.GOOGLE_TYPE,
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:Z", // your sheet name
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            name,
            phone,
            email,
            instagram,
            city,
            contactMethod,
            role,
            contentType,
            monthlyNeed,
            currentHandling,
            turnaround,
            inspiration,
            budget,
            startTime,
            website,
            comments,
            new Date().toLocaleString(),
          ],
        ],
      },
    });

    return res.status(200).json({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error submitting form" });
  }
}
