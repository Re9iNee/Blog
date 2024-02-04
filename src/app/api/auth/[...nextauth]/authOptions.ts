import { prisma } from "@/lib/prisma";

import { compare } from "bcryptjs";

import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions, User } from "next-auth";

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: {
          type: "email",
          label: "E-Mail",
          placeholder: "example@mail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "********",
        },
      },
      async authorize(credentials, req): Promise<User | null> {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

      if (!user) throw new Error("User not found");

      session.user.avatarUrl = user?.avatarUrl ?? null;
      session.user.id = user.id;

      return session;
    },
  },
};
