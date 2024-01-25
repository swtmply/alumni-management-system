"use client";

import { cn } from "@/app/lib/utils";
import { Profile, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import UpdateUserModal from "./update-user-modal";
import Link from "next/link";

type UserWithProfile = User & {
  profile: Profile | null;
};

export const userColumns: ColumnDef<UserWithProfile>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const isAdmin = row.original.role === "admin";

      return (
        <Link
          className={cn(
            isAdmin ? "text-black cursor-default" : "text-blue-500"
          )}
          href={isAdmin ? "#" : `/dashboard/user/${row.original.id}/profile`}
        >
          {row.getValue("name")}
        </Link>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "profile.course",
    header: "Course",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;

      return <p className="capitalize">{role}</p>;
    },
  },
  {
    accessorKey: "emailVerified",
    header: "Verified",
    cell: ({ row }) => {
      const verified = row.getValue("emailVerified");

      return (
        <div
          className={cn(
            "px-2 py-1 rounded-full text-white max-w-max",
            verified ? "bg-green-500" : "bg-red-500 hover:bg-red-600"
          )}
        >
          {verified ? (
            "Verified"
          ) : (
            <UpdateUserModal userId={row.original.id}>
              Not Verified
            </UpdateUserModal>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowVerified =
        row.getValue(id) === null ? "not-verified" : "verified";

      return value.includes(rowVerified);
    },
  },
];
