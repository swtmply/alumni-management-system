"use client";

import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const UserInformationTabs = () => {
  const pathname = usePathname();
  const { userId } = useParams();

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/dashboard/user/${userId}/profile`}
        className={cn(
          "px-4 py-2 rounded-md",
          pathname.includes("profile") && "text-white bg-red-500"
        )}
      >
        Profile
      </Link>
      <Link
        href={`/dashboard/user/${userId}/career`}
        className={cn(
          "px-4 py-2 rounded-md",
          pathname.includes("career") && "text-white bg-red-500"
        )}
      >
        Career
      </Link>
      <Link
        href={`/dashboard/user/${userId}/skills`}
        className={cn(
          "px-4 py-2 rounded-md",
          pathname.includes("skills") && "text-white bg-red-500"
        )}
      >
        Skills
      </Link>
    </div>
  );
};

export default UserInformationTabs;
