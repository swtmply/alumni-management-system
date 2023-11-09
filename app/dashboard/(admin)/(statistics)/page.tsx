import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FolderSearch, User2, UserCheck2, UserMinus2 } from "lucide-react";
import { auth } from "../../../lib/auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await auth();

  if (session?.user?.role === "user") redirect("/dashboard/user");

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-1 items-center text-2xl text-blue-500">
              <User2 />
              {Intl.NumberFormat("en-US", { currency: "USD" }).format(1000)}
            </CardTitle>
            <CardDescription>Total Number of Users</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-1 items-center text-2xl text-green-500">
              <UserCheck2 />
              {Intl.NumberFormat("en-US", { currency: "USD" }).format(1000)}
            </CardTitle>
            <CardDescription>Number of Verified Users</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-1 items-center text-2xl text-red-500">
              <UserMinus2 />
              {Intl.NumberFormat("en-US", { currency: "USD" }).format(1000)}
            </CardTitle>
            <CardDescription>Number Unverified of Users</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-1 items-center text-2xl text-purple-500">
              <FolderSearch />
              {Intl.NumberFormat("en-US", { currency: "USD" }).format(1000)}
            </CardTitle>
            <CardDescription>Jobs Listed</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
