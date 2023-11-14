import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  FilePlus,
  FileX,
  FolderSearch,
  User2,
  UserCheck2,
  UserMinus2,
} from "lucide-react";
import { auth } from "../../../lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/app/lib/db";

const Dashboard = async () => {
  const session = await auth();

  if (session?.user?.role === "user") redirect("/dashboard/user");

  const usersCount = await prisma.user.count({
    where: { role: "user" },
  });

  const unverifiedUsersCount = await prisma.user.count({
    where: { AND: [{ emailVerified: null }, { role: "user" }] },
  });

  const verifiedUsersCount = await prisma.user.count({
    where: { AND: [{ NOT: { emailVerified: null } }, { role: "user" }] },
  });

  const jobsCount = await prisma.job.count();

  const pendingDocumentsCount = await prisma.schedule.count({
    where: { status: "Pending" },
  });

  const approvedDocumentsCount = await prisma.schedule.count({
    where: { status: "Approved" },
  });

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-1 items-center text-2xl text-blue-500">
              <User2 />
              {Intl.NumberFormat("en-US", { currency: "USD" }).format(
                usersCount
              )}
            </CardTitle>
            <CardDescription>Total Number of Users</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-1 items-center text-2xl text-green-500">
              <UserCheck2 />
              {Intl.NumberFormat("en-US", { currency: "USD" }).format(
                verifiedUsersCount
              )}
            </CardTitle>
            <CardDescription>Number of Verified Users</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-1 items-center text-2xl text-red-500">
              <UserMinus2 />
              {Intl.NumberFormat("en-US", { currency: "USD" }).format(
                unverifiedUsersCount
              )}
            </CardTitle>
            <CardDescription>Number Unverified of Users</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-1 items-center text-2xl text-blue-500">
              <FolderSearch />
              {Intl.NumberFormat("en-US", { currency: "USD" }).format(
                jobsCount
              )}
            </CardTitle>
            <CardDescription>Jobs Listed</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-1 items-center text-2xl text-yellow-500">
              <FileX />
              {Intl.NumberFormat("en-US", { currency: "USD" }).format(
                pendingDocumentsCount
              )}
            </CardTitle>
            <CardDescription>Pending Documents Schedule</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-1 items-center text-2xl text-green-500">
              <FilePlus />
              {Intl.NumberFormat("en-US", { currency: "USD" }).format(
                approvedDocumentsCount
              )}
            </CardTitle>
            <CardDescription>Approved Documents Schedule</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
