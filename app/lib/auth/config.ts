import type { DefaultSession, NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../db";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      role: string;
      verified: boolean;
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
      const isVerified = auth?.user?.verified;

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        if (!isAdmin) {
          if (isVerified) {
            return Response.redirect(new URL("/dashboard/user", nextUrl));
          } else {
            return Response.redirect(
              new URL(`/dashboard/user/${auth.user?.id}/profile`, nextUrl)
            );
          }
        }

        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
    session(params) {
      const { session, token } = params as any;

      if (session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.image = token.picture;
        session.user.verified = token.verified;
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
        // @ts-ignore
        token.verified = user.emailVerified !== null;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
