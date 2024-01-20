import prisma from "@/app/lib/db";
import StatCard from "./stat-card";
import { FilePlus, FileX } from "lucide-react";

export const PendingDocumentsCard = async () => {
  const pendingDocumentsCount = await prisma.schedule.count({
    where: { status: "Pending" },
  });

  return (
    <StatCard
      data={pendingDocumentsCount}
      label="Pending Documents Schedule"
      icon={<FileX />}
    />
  );
};

export const ApprovedDocumentsCard = async () => {
  const approvedDocumentsCount = await prisma.schedule.count({
    where: { status: "Approved" },
  });

  return (
    <StatCard
      data={approvedDocumentsCount}
      label="Approved Documents Schedule"
      icon={<FilePlus />}
    />
  );
};
