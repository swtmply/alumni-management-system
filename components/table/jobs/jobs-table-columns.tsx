"use client";

import { Jobs } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const jobsColumns: ColumnDef<Jobs>[] = [
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
  },
];
