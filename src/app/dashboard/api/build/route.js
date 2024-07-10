import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

const testDataPath = path.join(process.cwd(), 'dataBuild.json');
import User from '../../models/User.js';o

export async function GET(request) {
  const { username } = request.body;
  const foundUser = User.findOne({ username });
  try {
    if (!foundUser){
      return NextResponse.json({message: "User not found in build route"});
    }
    console.log("Found user: ", foundUser)
    return NextResponse.json(foundUser.buildTime);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const { buildTime } = await request.json();
  const { APIkey } = request.headers.get('Authorization');
  request.body

  try {
    const User = await User.findOne({ APIkey });
    if (!User) { 
      return NextResponse.json({ message: 'API key was not found' }, { status: 409 });
    }
    // maybe make new schema with buildDate
    User.buildTime.push(buildTime);
    return NextResponse.json({ message: 'User build updated successfully'}, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error in build post request' }, { status: 500 });
  }
}