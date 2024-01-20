import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type StatCardProps = {
  data: number;
  label: string;
  icon: React.ReactNode;
};

const StatCard = ({ data, label, icon }: StatCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-1 items-center text-2xl text-green-500">
          {icon}
          {Intl.NumberFormat("en-US", { currency: "USD" }).format(data)}
        </CardTitle>
        <CardDescription>{label}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export const StatCardLoading = () => {
  return (
    <Card>
      <CardContent className="mt-4">
        <div className="flex gap-1 items-center text-2xl text-green-500 mb-2">
          <Skeleton className="w-6 h-6" />
          <Skeleton className="w-32 h-6" />
        </div>
        <Skeleton className="w-40 h-4" />
      </CardContent>
    </Card>
  );
};

export default StatCard;
