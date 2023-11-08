"use client";

import { cn } from "@/app/lib/utils";
import { FolderSearch, LayoutDashboard, Users2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import SignOutButton from "./sign-out-button";

interface NavigationProps {
  role: string | undefined;
}

interface NavigationItemProps {
  href: string;
  children: React.ReactNode;
}

const Navigation = ({ role }: NavigationProps) => {
  return (
    <nav className="mt-12 flex flex-col justify-between h-full">
      <ul className="flex flex-col gap-4">
        {role === "admin" ? (
          <>
            <NavigationItem href="/dashboard">
              <LayoutDashboard />
              Dashboard
            </NavigationItem>
            <NavigationItem href="/dashboard/users">
              <Users2 />
              Users
            </NavigationItem>
            <NavigationItem href="/dashboard/jobs">
              <FolderSearch />
              Jobs
            </NavigationItem>
          </>
        ) : (
          <>
            <NavigationItem href="/dashboard/user">Home</NavigationItem>
            <NavigationItem href="/dashboard/user/documents">
              Documents
            </NavigationItem>
            <NavigationItem href="/dashboard/user/profile">
              Profile
            </NavigationItem>
            <NavigationItem href="/dashboard/user/jobs">Jobs</NavigationItem>
          </>
        )}
      </ul>
      <SignOutButton />
    </nav>
  );
};

const NavigationItem = ({ href, children }: NavigationItemProps) => {
  const pathname = usePathname();
  const currentPath = pathname === href;

  return (
    <Link
      className={cn(
        "flex gap-2 hover:bg-red-600/40 p-2 rounded-md duration-150",
        currentPath && "bg-red-600 hover:bg-red-600 font-medium"
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default Navigation;
