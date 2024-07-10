import { NextResponse } from 'next/server';
const fs = require('fs');
const path = require('path');
const testDataPath = path.join(process.cwd(), 'dataBuild.json');

export async function GET() {
    console.log('get request made to /dashboard/api/build');
    const data = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
    console.log('build time data:', data);
    return NextResponse.json(data);
}

export async function POST(request) {
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
}