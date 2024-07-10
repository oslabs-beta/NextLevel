// app/api/middleware.js
import NextCors from 'nextjs-cors';
import { NextResponse } from 'next/server';

export async function corsMiddleware(request) {
  const response = NextResponse.next();
  
  response.headers.set('Access-Control-Allow-Credentials', 'false');
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  response.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
  }

  return response;
}

// export async function corsMiddleware(req) {
//     await NextCors(req, res, {
//         methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//         origin: '*',
//         optionsSuccessStatus: 200,
//       });
    
//       if (req.method === 'OPTIONS') {
//         res.status(200).end();
//         return;
//       }
// }