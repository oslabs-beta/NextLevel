import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Origin', '*'); // Replace '*' with your specific origin if needed
  response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Authorization, Content-Type, Connection, Postman-Token');
  
  // Handle OPTIONS method for CORS preflight request
  if (request.method === 'OPTIONS') {
    return response;
  }

  return response;
}

export const config = {
  matcher: '/dashboard/api/:path*',
};