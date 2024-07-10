import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

const testDataPath = path.join(process.cwd(), 'dataBundle.json');

export async function GET() {
  try {
    const data = JSON.parse(await fs.readFile(testDataPath, 'utf8'));
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  console.log('request ', request);
  try {
    console.log('going into try block post -- dashb api bundle')
    const body = await request.json();
    console.log('body:', body);
    const apiKey = request.headers.get('Authorization');
    console.log('apiKey:', apiKey);
    const newData = {
      bundleLog: body.bundleLog,
      apiKey: apiKey,
    };
    const currentData = JSON.parse(await fs.readFile(testDataPath, 'utf8'));
    currentData.testData.push(newData);
    await fs.writeFile(testDataPath, JSON.stringify(currentData));
    
    return NextResponse.json(newData, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Hi Fred' }, { status: 500 });
  }
}

// const fs = require('fs');
// const path = require('path');


// export async function GET() {
//     console.log('get request made to /dashboard/api/bundle');
//     const data = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
//     console.log('bundle time data:', data);
//     return Response.json(data);
// }

// export async function POST(request) {
//     console.log('post request made to /dashboard/api/bundle');
//     const body = await request.json();
//     const newData = {
//       "bundleLog": body.bundleLog,
//     };
//     const currentData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
//     currentData.testData.push(newData);
//     fs.writeFileSync(testDataPath, JSON.stringify(currentData));
//     return new Response(JSON.stringify(newData), {
//       headers: {
//         "Content-Type": "application/json"
//       },
//       status: 201,
//     });
// }
