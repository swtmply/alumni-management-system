import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardLoading = async () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="mt-4">
            <div className="flex gap-1 items-center text-2xl text-blue-500 mb-2">
              <Skeleton className="w-6 h-6" />
              <Skeleton className="w-32 h-6" />
            </div>
            <Skeleton className="w-40 h-4" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="mt-4">
            <div className="flex gap-1 items-center text-2xl text-blue-500 mb-2">
              <Skeleton className="w-6 h-6" />
              <Skeleton className="w-32 h-6" />
            </div>
            <Skeleton className="w-40 h-4" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="mt-4">
            <div className="flex gap-1 items-center text-2xl text-blue-500 mb-2">
              <Skeleton className="w-6 h-6" />
              <Skeleton className="w-32 h-6" />
            </div>
            <Skeleton className="w-40 h-4" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="mt-4">
            <div className="flex gap-1 items-center text-2xl text-blue-500 mb-2">
              <Skeleton className="w-6 h-6" />
              <Skeleton className="w-32 h-6" />
            </div>
            <Skeleton className="w-40 h-4" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardLoading;
