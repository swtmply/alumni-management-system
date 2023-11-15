import { auth } from "@/app/lib/auth";
import prisma from "@/app/lib/db";

import UserInformationTabs from "@/components/user-information-tabs";

const UserCareer = async ({ params }: { params: { userId: string } }) => {
  const session = await auth();

  const career = await prisma.career.findUnique({
    where: { userId: params.userId },
  });

  const user = await prisma.user.findUnique({
    where: { id: params.userId },
  });

  const editable = session?.user?.id === user?.id;

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="max-w-3xl w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight w-full">
          User Career Information
        </h2>
        <UserInformationTabs />

        <p>Feature will be available soon.</p>
      </div>
    </div>
  );
};

export default UserCareer;
