"use client";

import { SessionProvider } from "next-auth/react";

export interface SessionContextProps {
  children: React.ReactNode;
}

export default function SessionContext({ children }: SessionContextProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
