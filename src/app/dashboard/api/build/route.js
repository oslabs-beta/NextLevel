import { NextResponse } from 'next/server';
const fs = require('fs');
const path = require('path');
const testDataPath = path.join(process.cwd(), 'dataBuild.json');
import { corsMiddleware } from '../middleware.js';

export async function GET() {
    try {
      await corsMiddleware(request);
      console.log('get request made to /dashboard/api/build');
      const data = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
      console.log('build time data:', data);
      return NextResponse.json(data);
    } catch (error) {
      console.error(error);
      return NextResponse.error();
    }
}

export async function POST(request) {
    try {
      await corsMiddleware(request);
      console.log('post request made to /dashboard/api/build');
      const body = await request.json();
      const apiKey = request.headers.get('api-key');
      const newData = {
        "buildTime": body.buildTime,
        "apiKey": apiKey,
      };
      const currentData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
      currentData.testData.push(newData);
      fs.writeFileSync(testDataPath, JSON.stringify(currentData));
      return new Response(JSON.stringify(newData), {
        headers: {
          "Content-Type": "application/json"
        },
        status: 201,
      });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
}