"use client";

import { cn } from "@/app/lib/utils";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import UpdateUserModal from "./update-user-modal";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
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
  },
];