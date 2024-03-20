import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const UserDashboardLoading = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight w-full">Jobs</h2>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((job) => (
            <Card key={job}>
              <CardContent className="mt-4">
                <div>
                  <div>
                    <Skeleton className="w-32 h-8" />
                  </div>
                  <div>
                    <Skeleton className="w-full h-32 my-2" />
                  </div>
                </div>
                <div>
                  <Skeleton className="w-16 h-4" />
                  <span className="ml-2 text-red-500 text-base font-bold">
                    <Skeleton className="w-32 h-4" />
                  </span>
                </div>
                <div className="gap-2 my-2 flex flex-wrap">
                  <Skeleton className="w-8 h-2" />
                  <Skeleton className="w-8 h-2" />
                  <Skeleton className="w-8 h-2" />
                </div>
                <div className="font-medium text-sm">
                  <Skeleton className="w-16 h-4" />
                  <span className="ml-2 text-red-500 text-base font-bold">
                    <Skeleton className="w-32 h-4" />
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex justify-end w-full">
                  <Skeleton className="h-10 w-24" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLoading;
