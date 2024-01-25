import { auth } from "../../../lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { StatCardLoading } from "./stat-card";
import {
  UnverifiedUsersCard,
  UsersCard,
  VerifiedUsersCard,
} from "./users-card";
import { JobsCard } from "./jobs-card";
import { ApprovedDocumentsCard, PendingDocumentsCard } from "./documents-card";

const Dashboard = async () => {
  const session = await auth();

  if (session?.user?.role === "user") redirect("/dashboard/user");

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <Suspense fallback={<StatCardLoading />}>
          <UsersCard />
        </Suspense>
        <Suspense fallback={<StatCardLoading />}>
          <VerifiedUsersCard />
        </Suspense>
        <Suspense fallback={<StatCardLoading />}>
          <UnverifiedUsersCard />
        </Suspense>

        <Suspense fallback={<StatCardLoading />}>
          <JobsCard />
        </Suspense>

        <Suspense fallback={<StatCardLoading />}>
          <PendingDocumentsCard />
        </Suspense>
        <Suspense fallback={<StatCardLoading />}>
          <ApprovedDocumentsCard />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
