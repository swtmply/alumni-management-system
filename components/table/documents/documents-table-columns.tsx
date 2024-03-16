"use client";

import { cn } from "@/app/lib/utils";
import { Schedule } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import UpdateDocumentApprovalModal from "./update-schedule-modal";
import { zonedTimeToUtc, format } from "date-fns-tz";

export const documentsColumns: ColumnDef<Schedule>[] = [
  {
    accessorKey: "userId",
    header: "Name",
  },
  {
    accessorKey: "documents",
    header: "Documents Requested",
  },
  {
    accessorKey: "createdAt",
    header: "Date Requested",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;

      return format(zonedTimeToUtc(date, "Asia/Singapore"), "PP", {
        timeZone: "Asia/Singapore",
      });
    },
  },
  {
    accessorKey: "date",
    header: "Date for Document(s) Release",
    cell: ({ row }) => {
      const date = row.getValue("date") as Date;

      return format(zonedTimeToUtc(date, "Asia/Singapore"), "PP", {
        timeZone: "Asia/Singapore",
      });
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <div
          className={cn(
            "px-2 py-1 rounded-full text-white max-w-max",
            status === "Pending" && "bg-amber-500 hover:bg-amber-600",
            status === "Approved" && "bg-green-500 hover:bg-green-600",
            status === "Rejected" && "bg-red-500 hover:bg-red-600"
          )}
        >
          <UpdateDocumentApprovalModal documentId={row.original.id}>
            {status}
          </UpdateDocumentApprovalModal>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
