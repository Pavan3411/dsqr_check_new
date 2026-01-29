// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const country = req.headers.get('x-vercel-ip-country') || 'US';
  const currency = country === 'CA' ? 'CAD' : 'USD';

  const res = NextResponse.next();
  res.cookies.set('currency', currency, { path: '/', httpOnly: false });
  return res;
}
