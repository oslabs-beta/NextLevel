import dbConnect from './connectDB';
import User from '../models/User'; // Adjust the import based on your User model location
import bcrypt from 'bcryptjs';

export async function verifyCredentials(username, password) {
  // console.log('Connecting to database');
  await dbConnect();
  // console.log('Finding user by username:', username);
  const user = await User.findOne({ username });

  if (!user) {
    console.log('User not found');
    return null;
  }

  console.log('User found:', user);
  const isPassValid = await bcrypt.compare(password, user.password); // Use your specific method for comparing passwords
  if (!isPassValid) {
    console.log('Password is invalid');
    return null;
  }

  console.log('Password is valid');
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    username: user.username,
  };
}
