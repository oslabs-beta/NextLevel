import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyCredentials } from '../../../lib/auth'; // Adjust the path to your auth function

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
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  callbacks: {
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
});

export { handler as GET, handler as POST };

