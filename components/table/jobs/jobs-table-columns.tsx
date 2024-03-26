"use client";

import { Job } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import JobsRowActions from "./jobs-row-actions";
import ApproveJobModal from "./approve-job-modal";

export const jobsColumns: ColumnDef<Job>[] = [
  {
    accessorKey: "companyName",
    header: "Company Name",
    // TODO add hyperlink on company name
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;

      return <div className="line-clamp-1 max-w-xs">{description}</div>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "skills",
    header: "Skills Required",
  },
  {
    accessorKey: "courses",
    header: "Related Courses",
    filterFn: (rows, id, filterValue) => {
      return (
        filterValue.filter((value: string) =>
          (rows.getValue(id) as string[]).includes(value)
        ).length !== 0
      );
    },
  },
  {
    accessorKey: "experience",
    header: "Years of Experience",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <ApproveJobModal job={row.original}>
          <button
            className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${
              status === "approved"
                ? "bg-green-100 text-green-800"
                : status === "rejected"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {status}
          </button>
        </ApproveJobModal>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <JobsRowActions job={row.original} />,
  },
];
