import dbConnect from '../../lib/connectDB';
import User from '../../models/User';

export async function GET(request) {
    await dbConnect(); // Ensure database connection
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');
        if (!username) {
            return new Response(JSON.stringify({ message: 'Username is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const foundUser = await User.findOne({ username });

        if (!foundUser) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        // Assuming foundUser.APIkey exists and is the correct value to return
        return new Response(JSON.stringify({ APIkey: foundUser.APIkey }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

// // fetch reqeust for api key given username

// import dbConnect from '../../lib/connectDB';
// import User from '../../models/User';
// import { NextResponse } from 'next/server';

// export async function GET(request) {
//     // if doesn't work, try to add dbConnect to connect to db first
//     try {
//     const { searchParams } = new URL(request.url);
//     const username = searchParams.get('username');
//     if (!username) {
//       return NextResponse.json({ message: 'Username is required' }, { status: 400 });
//     }

//     const foundUser = await User.findOne({ username });

//     if (!foundUser) {
//       return NextResponse.json({ message: "User not found when searching for api key in onboarding/api/route.js" }, { status: 404 });
//     }

//     console.log("Found user: ", foundUser);
//     return NextResponse.json(foundUser.APIkey);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }