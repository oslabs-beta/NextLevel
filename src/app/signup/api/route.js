// may want to put this inside of a metrics endpoint or something and modify the npm package to this endpoint
const fs = require('fs');
const path = require('path');
const testDataPath = path.join(process.cwd(), 'data.json');
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('get request made to signup/api/routes');
  const data = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
  return Response.json(data);
}

export async function POST(request) {
  console.log('post request made to /dashboard/api');
  const body = await request.json();
  const newData = {
    metricType: body.name,
    metricValue: body.value, // changed from body.time to body.value, as the metric value is stored in the value field
    //add metric time here or when sending over from the client in the body
  };
  const currentData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
  currentData.testData.push(newData);
  fs.writeFileSync(testDataPath, JSON.stringify(currentData));
  return new Response(JSON.stringify(newData), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 201,
  });
}
