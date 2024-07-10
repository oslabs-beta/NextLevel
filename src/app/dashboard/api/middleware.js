// app/api/middleware.js
import NextCors from 'nextjs-cors';

export async function corsMiddleware(req) {
  await NextCors(req, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });
}