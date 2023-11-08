"use client";

import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserInformationTabs = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/dashboard/user/profile"
        className={cn(
          "px-4 py-2 border border-slate-500 rounded-md",
          pathname === "/dashboard/user/profile" &&
            "text-white bg-red-500 border-none"
        )}
      >
        Profile
      </Link>
      <Link
        href="/dashboard/user/career"
        className={cn(
          "px-4 py-2 border border-slate-500 rounded-md",
          pathname === "/dashboard/user/career" &&
            "text-white bg-red-500 border-none"
        )}
      >
        Career
      </Link>
      <Link
        href="/dashboard/user/skills"
        className={cn(
          "px-4 py-2 border border-slate-500 rounded-md",
          pathname === "/dashboard/user/skills" &&
            "text-white bg-red-500 border-none"
        )}
      >
        Skills
      </Link>
    </div>
  );
};

export default UserInformationTabs;
