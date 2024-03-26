import { GraduationCap } from "lucide-react";
import { auth } from "../lib/auth";
import Navigation, { NavigationSkeleton } from "@/components/navigation";
import Header from "@/components/header";
import { Suspense } from "react";
import prisma from "../lib/db";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  const availableCourses = await prisma.job.findMany({
    select: {
      courses: true,
    },
  });

  const courses = availableCourses.reduce((acc, job) => {
    job.courses.forEach((course) => {
      if (!acc.includes(course)) {
        acc.push(course);
      }
    });

    return acc;
  }, [] as string[]);

  return (
    <div className="flex relative">
      <div className="h-screen max-h-screen w-full max-w-xs sticky top-0 border-r text-foreground px-4 py-10 flex flex-col">
        <h1 className="flex items-center gap-4">
          <GraduationCap className="w-10 h-10" />
          <span className="font-semibold text-xl max-w-[10rem] leading-5">
            Career Tracking System
          </span>
        </h1>
        <Suspense fallback={<NavigationSkeleton />}>
          <Navigation role={session?.user?.role} />
        </Suspense>
      </div>
      <main className="flex flex-col px-4 py-12 w-full">
        <Header courses={courses} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
