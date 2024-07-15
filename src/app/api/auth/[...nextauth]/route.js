import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyCredentials } from '../../../lib/auth'; // Adjust the path to your auth function
import dbConnect from '../../../lib/connectDB';
import User from '../../../models/User';
import Str from '@supercharge/strings';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        console.log('Authorizing user with credentials:', credentials);
        const user = await verifyCredentials(credentials.username, credentials.password);
        if (user) {
          console.log('User authorized:', user);
          return user;
        } else {
          console.log('Authorization failed');
          throw new Error('Invalid username or password');
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('SignIn callback:', user, account, profile);
      await dbConnect();

      try {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          let APIkey = Str.random(); //generating random API key
    
          let existingAPI = await User.findOne({ APIkey });

          while (existingAPI) {
            APIkey = Str.random();
            existingAPI = await User.findOne({ APIkey });
          }
          const newUser = new User({
            username: user.email,
            email: user.email,
            APIkey,
          });
          await newUser.save();
        }

        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async session({ session, token }) {
      console.log('Session callback:', session, token);
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      console.log('JWT callback:', token, user);
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  events: {
    error: (message) => {
      console.error('NextAuth error:', message);
    },
  },
});

export { handler as GET, handler as POST };

