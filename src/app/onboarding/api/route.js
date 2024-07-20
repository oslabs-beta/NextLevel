import dbConnect from '../../lib/connectDB';
import User from '../../models/User';

export async function GET(request) {
    await dbConnect(); // Ensure database connection
    try {
        // const { searchParams } = new URL(request.url, `http://${request.headers.get('host')}`);
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

// export const runtime = "edge"