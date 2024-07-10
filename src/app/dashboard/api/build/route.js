import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

const testDataPath = path.join(process.cwd(), 'dataBuild.json');

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
  try {
    const body = await request.json();
    const apiKey = request.headers.get('Authorization');
    const newData = {
      buildTime: body.buildTime,
      apiKey: apiKey,
    };
    const currentData = JSON.parse(await fs.readFile(testDataPath, 'utf8'));
    currentData.testData.push(newData);
    await fs.writeFile(testDataPath, JSON.stringify(currentData));
    
    return NextResponse.json(newData, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


// import fs from 'fs/promises';
// import path from 'path';
// import { NextResponse } from 'next/server';
// import { corsMiddleware } from '../middleware';
// const testDataPath = path.join(process.cwd(), 'dataBuild.json');


// export async function GET(request) {
//     try {
//       const corsResponse = await corsMiddleware(request);
//       console.log('get request made to /dashboard/api/build');
//       const data = JSON.parse(await fs.readFile(testDataPath, 'utf8'));
//       console.log('build time data:', data);
//       //original version
//       // return NextResponse.json(data, { headers: corsResponse.headers }); //does this need the new keyword?
//       //new version - Combine CORS headers with JSON response
//       const response = NextResponse.json(data);
//       corsResponse.headers.forEach((value, key) => {
//         response.headers.set(key, value);
//       });
//       return response;
//     } catch (error) {
//       console.error(error);
//       return new NextResponse(`Internal Server Error: ${error.message}`, { status: 500 });  //does this need the new keyword?
//     }
// }

// export async function POST(request) {
//     try {
//       const corsResponse = await corsMiddleware(request); // Apply CORS middleware
//       console.log('post request made to /dashboard/api/build');
//       const body = await request.json();
//       const apiKey = request.headers.get('Authorization');
//       const newData = {
//         "buildTime": body.buildTime,   //do the keys need to be strings?
//         "apiKey": apiKey,
//       };
//       const currentData = JSON.parse(await fs.readFile(testDataPath, 'utf8'));
//       currentData.testData.push(newData);
//       await fs.writeFile(testDataPath, JSON.stringify(currentData));

//       //original version
//       // return NextResponse(JSON.stringify(newData), {  //does this need the new keyword?
//       //   headers: corsResponse.headers,
//       //   status: 201,
//       // });

//       //new version - Combine CORS headers with JSON response
//       const response = new NextResponse(JSON.stringify(newData), { status: 201 });
//       corsResponse.headers.forEach((value, key) => {
//         response.headers.set(key, value);
//       });
//       return response;

//     } catch (error) {
//       console.error(error);
//       return new NextResponse('Internal Server Error', { status: 500 });  //does this need the new keyword?
//     }
// }

