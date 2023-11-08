"use client";

import { Job } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import JobsRowActions from "./jobs-row-actions";

export const jobsColumns: ColumnDef<Job>[] = [
  {
    accessorKey: "companyName",
    header: "Company Name",
    // TODO add hyperlink on company name
  },
  {
    accessorKey: "description",
    header: "Description",
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
  },
  {
    accessorKey: "experience",
    header: "Years of Experience",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <JobsRowActions job={row.original} />,
  },
];
