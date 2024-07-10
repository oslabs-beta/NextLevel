import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { corsMiddleware } from '../middleware';
const testDataPath = path.join(process.cwd(), 'dataBuild.json');


export async function GET(request) {
  const corsResponse = await corsMiddleware(request);
  if (corsResponse.status === 204) {
    return corsResponse;
  }

    try {
      // await corsMiddleware(req, res);
      console.log('get request made to /dashboard/api/build');
      const data = JSON.parse(await fs.readFile(testDataPath, 'utf8'));
      console.log('build time data:', data);
      return NextResponse.json(data);
    } catch (error) {
      console.error(error);
      return new NextResponse(`Internal Server Error: ${error.message}`, { status: 500 });
    }
}

export async function POST(request) {
  const corsResponse = await corsMiddleware(request);
  if (corsResponse.status === 204) {
    return corsResponse;
  }
    try {
      // await corsMiddleware(req, res);
      console.log('post request made to /dashboard/api/build');
      const body = await request.json();
      const apiKey = request.headers.get('api-key');
      const newData = {
        "buildTime": body.buildTime,
        "apiKey": apiKey,
      };
      const currentData = JSON.parse(await fs.readFile(testDataPath, 'utf8'));
      currentData.testData.push(newData);
      await fs.writeFile(testDataPath, JSON.stringify(currentData));
      return new NextResponse(JSON.stringify(newData), {
        headers: {
          "Content-Type": "application/json"
        },
        status: 201,
      });
    } catch (error) {
      console.error(error);
      return new NextResponse('Internal Server Error', { status: 500 });
    }
}