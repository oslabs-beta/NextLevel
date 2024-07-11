import dbConnect from './app/lib/connectDB'

export async function register() {
    await dbConnect()
}