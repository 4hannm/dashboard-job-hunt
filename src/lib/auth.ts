import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../lib/prisma";
import { comparePassword } from "@/lib/utils";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.company.findFirst({
          where: { email: credentials.email },
        });
        if (!user) return null;

        const isMatch = await comparePassword(credentials.password, user.password);
        if (!isMatch) return null;

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },
  callbacks: {
    jwt({ token, account, user }) {
      if (account && user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user && token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
