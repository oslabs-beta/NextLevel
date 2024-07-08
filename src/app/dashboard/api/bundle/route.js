const fs = require('fs');
const path = require('path');
const testDataPath = path.join(process.cwd(), 'dataBundle.json');

export async function GET() {
    console.log('get request made to /dashboard/api/bundle');
    const data = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
    console.log('bundle time data:', data);
    return Response.json(data);
}

export async function POST(request) {
    console.log('post request made to /dashboard/api/bundle');
    const body = await request.json();
    const newData = {
      "bundleLog": body.bundleLog,
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