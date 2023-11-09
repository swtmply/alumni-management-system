import { GraduationCap } from "lucide-react";
import { auth } from "../lib/auth";
import Navigation from "@/components/navigation";
import Header from "@/components/header";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <div className="flex relative">
      <div className="h-screen max-h-screen w-full max-w-xs sticky top-0 bg-red-500 text-white px-4 py-10 flex flex-col">
        <h1 className="flex items-center gap-4">
          <GraduationCap className="w-10 h-10" />
          <span className="font-semibold text-xl max-w-[10rem] leading-5">
            Career Tracking System
          </span>
        </h1>
        <Suspense
          fallback={
            <div className="mt-12 flex flex-col justify-between h-full">
              <ul className="flex flex-col gap-4">
                <li>
                  <div className="flex gap-2 hover:bg-red-600/40 p-2 rounded-md duration-150">
                    <Skeleton className="w-6 h-6" />
                    <Skeleton className="w-40 h-6" />
                  </div>
                </li>
                <li>
                  <div className="flex gap-2 hover:bg-red-600/40 p-2 rounded-md duration-150">
                    <Skeleton className="w-6 h-6" />
                    <Skeleton className="w-40 h-6" />
                  </div>
                </li>
                <li>
                  <div className="flex gap-2 hover:bg-red-600/40 p-2 rounded-md duration-150">
                    <Skeleton className="w-6 h-6" />
                    <Skeleton className="w-40 h-6" />
                  </div>
                </li>
              </ul>
              <div className="flex gap-2 hover:bg-red-600/40 p-2 rounded-md duration-150">
                <Skeleton className="w-6 h-6" />
                <Skeleton className="w-40 h-6" />
              </div>
            </div>
          }
        >
          <Navigation role={session?.user?.role} />
        </Suspense>
      </div>
      <main className="flex flex-col px-4 py-12 w-full">
        <Suspense
          fallback={
            <div className="flex items-center gap-2 w-full justify-end mb-8">
              <div className="flex flex-col gap-2">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-24 h-2" />
              </div>
              <Skeleton className="w-12 h-12 rounded-full" />
            </div>
          }
        >
          <Header
            session={{ name: session?.user?.name, role: session?.user?.role }}
          />
        </Suspense>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
