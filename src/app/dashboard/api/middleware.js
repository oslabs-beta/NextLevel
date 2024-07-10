import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Origin', '*'); // Replace '*' with your specific origin if needed
  response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  
  // Handle OPTIONS method for CORS preflight request
  if (request.method === 'OPTIONS') {
    return response;
  }

  return response;
}

export const config = {
  matcher: '/dashboard/api/:path*',
};

// import { NextResponse } from 'next/server';

// // export async function corsMiddleware(request) {
// //   const response = NextResponse.next();
// //   response.headers.set('Access-Control-Allow-Credentials', 'true');
// //   response.headers.set('Access-Control-Allow-Origin', '*'); // Replace '*' with your specific origin if needed
// //   response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
// //   response.headers.set('Access-Control-Allow-Headers', 'Connection, Postman-Token, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, api-key');
// //   return response;
// // }