import dbConnect from '../../../lib/connectDB.js';
import User from '../../../models/User.js';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    if (!username) {
      return NextResponse.json({ message: 'Username is required' }, { status: 400 });
    }
    const foundUser = await User.findOne({ username }).lean();
    if (!foundUser) {
      return NextResponse.json({ message: "User not found in bundle route" }, { status: 404 });
    }
    //console.log("Found user: ", foundUser);
    return NextResponse.json(foundUser.bundleLog);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();
  try {
    const { bundleLog } = await request.json();
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

    const parsedLog = bundleLog.match(/(Route \(app\)|Page)[\s\S]*/)?.[0] || 'No Bundle Information Found for This Build';
    //match anything starting with Route(app) or Page, keeping everything afterwards including white spaces. 
    // if no match then display 'No Bundle Information Found for This Build' to render on dashboard

    const newBundle = {
      bundleLog: parsedLog,
      bundleDate: Date.now()
    }
    user.bundleLog.push(newBundle);
    
    await user.save();

    return NextResponse.json({ message: 'User build updated successfully'}, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: `Internal server error in build post request ${error}` }, { status: 500 });
  }
}