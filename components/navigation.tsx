"use client";

import { cn } from "@/app/lib/utils";
import {
  CalendarDays,
  File,
  FolderSearch,
  Home,
  LayoutDashboard,
  User2,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import SignOutButton from "./sign-out-button";
import { Skeleton } from "./ui/skeleton";
import { useSession } from "next-auth/react";

interface NavigationProps {
  role: string | undefined;
}

interface NavigationItemProps {
  href: string;
  children: React.ReactNode;
}

const Navigation = ({ role }: NavigationProps) => {
  const { data: session } = useSession();

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
            <NavigationItem href="/dashboard/documents">
              <File />
              Documents
            </NavigationItem>
            <NavigationItem href="/dashboard/events">
              <CalendarDays />
              Events
            </NavigationItem>
          </>
        ) : (
          <>
            <NavigationItem href="/dashboard/user">
              <Home />
              Home
            </NavigationItem>
            <NavigationItem href="/dashboard/user/documents">
              <File />
              Documents
            </NavigationItem>
            <NavigationItem href="/dashboard/user/events">
              <CalendarDays />
              Events
            </NavigationItem>
            <NavigationItem
              href={`/dashboard/user/${session?.user?.id}/profile`}
            >
              <User2 />
              Profile
            </NavigationItem>
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

export const NavigationSkeleton = () => {
  return (
    <div className="mt-12 flex flex-col justify-between h-full">
      <ul className="flex flex-col gap-4">
        <li>
          <div className="flex gap-2 hover:bg-red-600/40 p-2 rounded-md duration-150">
            <Skeleton className="w-6 h-6" />
            <Skeleton className="w-40 h-6" />
          </div>
        </li>
        <li>
          <div className="flex gap-2 hover:bg-red-600/40 p-2 rounded-md duration-150">
            <Skeleton className="w-6 h-6" />
            <Skeleton className="w-40 h-6" />
          </div>
        </li>
        <li>
          <div className="flex gap-2 hover:bg-red-600/40 p-2 rounded-md duration-150">
            <Skeleton className="w-6 h-6" />
            <Skeleton className="w-40 h-6" />
          </div>
        </li>
      </ul>
      <div className="flex gap-2 hover:bg-red-600/40 p-2 rounded-md duration-150">
        <Skeleton className="w-6 h-6" />
        <Skeleton className="w-40 h-6" />
      </div>
    </div>
  );
};

export default Navigation;
