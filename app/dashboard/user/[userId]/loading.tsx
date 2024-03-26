import { Skeleton } from "@/components/ui/skeleton";

const ProfileLoading = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col gap-4">
        <Skeleton className="w-44 h-10" />

        <div className="flex gap-2">
          <Skeleton className="w-24 h-10" />
          <Skeleton className="w-24 h-10" />
          <Skeleton className="w-24 h-10" />
        </div>

        <div className="p-4 w-full h-96 bg-slate-50 rounded-md">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="p-4 w-full h-96 bg-slate-50 rounded-md">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default ProfileLoading;
