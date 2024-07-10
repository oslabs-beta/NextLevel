import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

const testDataPath = path.join(process.cwd(), 'data.json');

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
    console.log('going into try block post -- dashb api')
    const body = await request.json();
    console.log('body:', body);
    const newData = {
      "metricType" : body.name,
      "metricValue" : body.value, // changed from body.time to body.value, as the metric value is stored in the value field
      //add metric time here or when sending over from the client in the body
      "apiKey" : body.apiKey,
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



// // may want to put this inside of a metrics endpoint or something and modify the npm package to this endpoint
// const fs = require('fs');
// const path = require('path');
// import { NextResponse } from 'next/server';

// export async function GET() {
//     console.log('get request made to /dashboard/api');
//     const data = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
//     return Response.json(data);
// }

// export async function POST(request) {
//     console.log('post request made to /dashboard/api');
//     console.log()
//     const body = await request.json();
//     const newData = {
//       "metricType" : body.name,
//       "metricValue" : body.value, // changed from body.time to body.value, as the metric value is stored in the value field
//       //add metric time here or when sending over from the client in the body
//       "apiKey" : body.apiKey,
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