<<<<<<< HEAD
import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { corsMiddleware } from '../middleware';
const testDataPath = path.join(process.cwd(), 'dataBuild.json');
import { corsMiddleware } from '../middleware.js';


export async function GET(request) {
    try {
      const corsResponse = await corsMiddleware(request);
      console.log('get request made to /dashboard/api/build');
      const data = JSON.parse(await fs.readFile(testDataPath, 'utf8'));
      console.log('build time data:', data);
      //original version
      // return NextResponse.json(data, { headers: corsResponse.headers }); //does this need the new keyword?
      //new version - Combine CORS headers with JSON response
      const response = NextResponse.json(data);
      corsResponse.headers.forEach((value, key) => {
        response.headers.set(key, value);
      });
      return response;
    } catch (error) {
      console.error(error);
      return new NextResponse(`Internal Server Error: ${error.message}`, { status: 500 });  //does this need the new keyword?
=======
import dbConnect from '../../../lib/connectDB.js';
import User from '../../../models/User.js';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    if (!username) {
      return NextResponse.json({ message: 'Username is required' }, { status: 400 });
>>>>>>> dev
    }

    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return NextResponse.json({ message: "User not found in build route" }, { status: 404 });
    }

    console.log("Found user: ", foundUser);
    return NextResponse.json(foundUser.buildTime);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
<<<<<<< HEAD
    try {
      const corsResponse = await corsMiddleware(request); // Apply CORS middleware
      console.log('post request made to /dashboard/api/build');
      const body = await request.json();
      const apiKey = request.headers.get('api-key');
      const newData = {
        "buildTime": body.buildTime,   //do the keys need to be strings?
        "apiKey": apiKey,
      };
      const currentData = JSON.parse(await fs.readFile(testDataPath, 'utf8'));
      currentData.testData.push(newData);
      await fs.writeFile(testDataPath, JSON.stringify(currentData));

      //original version
      // return NextResponse(JSON.stringify(newData), {  //does this need the new keyword?
      //   headers: corsResponse.headers,
      //   status: 201,
      // });

      //new version - Combine CORS headers with JSON response
      const response = new NextResponse(JSON.stringify(newData), { status: 201 });
      corsResponse.headers.forEach((value, key) => {
        response.headers.set(key, value);
      });
      return response;

    } catch (error) {
      console.error(error);
      return new NextResponse('Internal Server Error', { status: 500 });  //does this need the new keyword?
    }
}

=======
  await dbConnect();

  try {

    const { buildTime } = await request.json();
    const APIkey = request.headers.get('Authorization');
    console.log('API key:', APIkey);

    if (!APIkey) {
      return NextResponse.json({ message: 'API key is required' }, { status: 400 });
    }

    console.log('going into try block post -- dashb api bundle')
    const user = await User.findOne({ APIkey });
    console.log('User:', user);
    if (!user) { 
      return NextResponse.json({ message: 'API key was not found' }, { status: 409 });
    }
    // maybe make new schema with buildDate
    const newBuild = {
      buildTime,
      buildDate: Date.now()
    }
    user.buildTime.push(newBuild);
    
    await user.save();

    return NextResponse.json({ message: 'User build updated successfully'}, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: `Internal server error in build post request ${error}` }, { status: 500 });
  }
}
>>>>>>> dev
