import prisma from "@/app/lib/db";
import React from "react";
import StatCard from "./stat-card";
import { FolderSearch } from "lucide-react";

export const JobsCard = async () => {
  const jobsCount = await prisma.job.count();

  return <StatCard data={jobsCount} label="Total Number of Jobs" icon={<FolderSearch />} />;
};
