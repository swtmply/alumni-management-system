import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/app/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/providers";
import { auth } from "./lib/auth";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Alumni Management System",
  description: "Alumni management system for X university.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <main>
          <Providers session={session}>{children}</Providers>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
