"use client";

import { cn } from "@/app/lib/utils";
import { Schedule } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import UpdateDocumentApprovalModal from "./update-schedule-modal";

export const documentsColumns: ColumnDef<Schedule>[] = [
  {
    accessorKey: "documents",
    header: "Documents Requested",
  },
  {
    accessorKey: "date",
    header: "Date for Document(s) Release",
  },
  {
    accessorKey: "approved",
    header: "Status",
    cell: ({ row }) => {
      const approved = row.getValue("approved") as string;

      return (
        <div
          className={cn(
            "px-2 py-1 rounded-full text-white max-w-max",
            approved === "Pending" && "bg-amber-500 hover:bg-amber-600",
            approved === "Approved" && "bg-green-500 hover:bg-green-600",
            approved === "Rejected" && "bg-red-500 hover:bg-red-600"
          )}
        >
          <UpdateDocumentApprovalModal documentId={row.original.id}>
            {approved}
          </UpdateDocumentApprovalModal>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
