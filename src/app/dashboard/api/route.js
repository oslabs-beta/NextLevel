
// const testData = [
//     {
//         metricType: "test",
//         metricTime: "1",
//     }
// ];

// export async function GET () {
//     return Response.json(testData);
// }

// export async function POST (request) {
//     const body = await request.json();
//     const newData = {
//       "metricType" : body.name,
//       "metricTime" : body.time,
//     }
//     testData.push(newData);
//     return new Response(JSON.stringify(newData), {
//       headers: {
//         "Content-Type": "application/json"
//       },
//       status: 201,
//     });
// }



const fs = require('fs');
const path = require('path');
const testDataPath = path.join(process.cwd(), 'data.json');

export async function GET() {
    console.log('get request made to /dashboard/api');
    const data = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
    return Response.json(data);
}

export async function POST(request) {
    console.log('post request made to /dashboard/api');
    const body = await request.json();
    const newData = {
      "metricType" : body.name,
      "metricTime" : body.time,
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