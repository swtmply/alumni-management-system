import { Skeleton } from "@/components/ui/skeleton";

const DocumentsLoading = async () => {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Documents table</h2>
      <div className="w-full flex justify-between my-4">
        <div className="flex gap-2 items-center">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-8 w-20" />
        </div>
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="bg-slate-50 w-full h-64 p-4 rounded-md flex flex-col gap-4">
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  );
};

export default DocumentsLoading;
