import type { DefaultSession, NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../db";
declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isAdmin = auth?.user?.role === "admin";

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        if (!isAdmin) {
          return Response.redirect(new URL("/dashboard/user", nextUrl));
        }

        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        // @ts-ignore
        session.user.role = token.role;
        session.user.image = token.picture;
      }
      return session;
    },
    jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        token = {
          ...token,
          ...session,
        };
      }

      if (user) {
        // @ts-ignore
        token.role = user.role;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
