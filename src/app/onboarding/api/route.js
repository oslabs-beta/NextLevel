import dbConnect from '../../lib/connectDB';
import User from '../../models/User';
import { NextResponse } from 'next/server';


export async function GET(request) {
    await dbConnect(); // Ensure database connection
    try {
        const { searchParams } = new URL(request.nextUrl);
        // const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');
        if (!username) {
            return NextResponse.json({ message: 'Username is required' }, { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const foundUser = await User.findOne({ username });

        if (!foundUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        return  NextResponse.json({ APIkey: foundUser.APIkey }, { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

export const runtime = "nodejs"; 