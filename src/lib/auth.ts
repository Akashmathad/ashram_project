import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from './db';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: { label: 'username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { username: credentials?.username },
        });
        if (!existingUser) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials?.password,
          existingUser.password
        );
        if (!isPasswordValid) {
          return null;
        }

        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.username) {
        return { ...token, username: user.username };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token?.username,
        },
      };
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
