import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DocumentsLoading = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="max-w-6xl w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight w-full">
          Request for documents
        </h2>
        <div className="flex gap-4">
          <Card className="w-full">
            <CardContent className="mt-4">
              <Skeleton className="w-32 h-6" />
              <div className="w-full flex flex-col justify-between py-2 border-b border-bg">
                <div className="text-sm text-slate-500 mt-4 mb-2">
                  <Skeleton className="w-40 h-6" />
                </div>
                <Skeleton className="w-64 h-6" />
              </div>
              <div className="w-full flex flex-col justify-between py-2 border-b border-bg">
                <div className="text-sm text-slate-500 mt-4 mb-2">
                  <Skeleton className="w-40 h-6" />
                </div>
                <Skeleton className="w-64 h-6" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="mt-4 flex flex-col gap-2">
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-64 h-64" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentsLoading;
