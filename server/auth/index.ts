import NextAuth from "next-auth";
import { authConfig } from "./config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "../db";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await prisma.user.findUnique({ where: { email } });

          if (!user) return null;

          if (password === user.password) return user;
        }

        return null;
      },
    }),
  ],
});
