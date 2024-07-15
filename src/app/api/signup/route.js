import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../lib/connectDB';
import User from '../../models/User';
import Str from '@supercharge/strings';


export async function POST(req) {
  const { username, email, password } = await req.json();

  if (!username || !password || !email ) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  await dbConnect();

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) { //if user already exsists
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }
    const hashedPassword = await bcrypt.hash(password, 10); //hashiing the password
    
    let APIkey = Str.random(); //generating random API key
    
    let existingAPI = await User.findOne({ APIkey });

    while (existingAPI) {
      APIkey = Str.random();
      existingAPI = await User.findOne({ APIkey });
    }
 
    const user = new User({ //creating the new user
      username,
      email,
      password: hashedPassword,
      APIkey,
    });

    await user.save();//saving user to the database

    return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
