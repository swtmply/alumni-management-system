import { GraduationCap } from "lucide-react";
import { auth } from "../lib/auth";
import Navigation from "@/components/navigation";
import prisma from "../lib/db";
import Image from "next/image";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: { role: true },
  });

  return (
    <div className="flex">
      <div className="h-screen max-h-screen w-full max-w-xs bg-red-500 text-white px-4 py-10 flex flex-col">
        <h1 className="flex items-center gap-4">
          <GraduationCap className="w-10 h-10" />
          <span className="font-semibold text-xl max-w-[10rem] leading-5">
            Career Tracking System
          </span>
        </h1>
        <Navigation role={user?.role} />
      </div>
      <main className="flex flex-col px-4 py-12 w-full">
        <div className="flex items-center gap-2 justify-end mb-8">
          <div className="flex flex-col items-end">
            <p className="font-bold text-red-500 leading-3">
              {session?.user?.name}
            </p>
            <p className="capitalize text-sm">{user?.role}</p>
          </div>

          <div className="rounded-full bg-slate-400 aspect-square h-12 relative">
            <Image
              src={"https://github.com/swtmply.png"}
              className="rounded-full"
              alt="Avatar"
              fill
            />
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
