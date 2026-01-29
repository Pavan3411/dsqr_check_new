// src/app/api/career/route.js
export const runtime = 'nodejs';

import { put } from '@vercel/blob';
import { google } from 'googleapis';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const cvFile = formData.get('cv');

    let cvFileUrl = '';

    // --- Part 1: Vercel Blob Upload ---
    // Check if a file was uploaded
    if (cvFile && cvFile.size > 0) {
      // Create a unique filename for the CV
      const uniqueFilename = `cv-${Date.now()}-${cvFile.name}`;

      // Upload the file to Vercel Blob
      const blob = await put(uniqueFilename, cvFile, {
        access: 'public',
      });

      // Use the public URL from the response
      cvFileUrl = blob.url;
    }
    // --- End of Blob Logic ---

    // --- Part 2: Google Sheets Update ---
    // Authenticate with Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: process.env.GOOGLE_TYPE,
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare the data row, including the new Vercel Blob URL
    const fields = {
      firstName: formData.get('firstName') || '',
      lastName: formData.get('lastName') || '',
      email: formData.get('email') || '',
      phoneNumber: formData.get('phoneNumber') || '',
      position: formData.get('position') || '',
      message: formData.get('message') || '',
      cv: cvFileUrl, // <-- The public URL from Vercel Blob
      timestamp: new Date().toLocaleString(),
    };

    // Normalize keys and map data to your sheet's header order
    const normalizedFields = {};
    for (const key of Object.keys(fields)) {
      normalizedFields[key.trim().toLowerCase()] = fields[key];
    }
    
    const sheetName = process.env.GOOGLE_SHEET_NAME || 'career';
    const headerRes = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: `${sheetName}!1:1`,
    });

    const headersRaw = headerRes.data.values?.[0] || [];
    const headersNormalized = headersRaw.map((h) => String(h || '').trim().toLowerCase());
    const row = headersNormalized.map((hNorm) => normalizedFields[hNorm] ?? '');

    // Append the new row to your Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${sheetName}!A:Z`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [row] },
    });

    return new Response(JSON.stringify({ success: true, message: 'Submitted Successfully' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (err) {
    console.error('Career route error:', err);
    return new Response(JSON.stringify({ success: false, message: 'Server error' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}