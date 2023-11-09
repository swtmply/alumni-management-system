import { auth } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import ContactInfoCard from "@/components/contact-info-card";
import ProfileForm from "@/components/profile-form";
import ProfileInfoCard from "@/components/profile-info-card";

import UserInformationTabs from "@/components/user-information-tabs";

const UserDashboard = async () => {
  const session = await auth();

  const profile = await prisma.profile.findUnique({
    where: { userId: session?.user?.id },
  });

  if (!profile)
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <div className="max-w-3xl w-full">
          <h2 className="text-2xl font-bold tracking-tight w-full">
            Complete your profile
          </h2>
          <ProfileForm />
        </div>
      </div>
    );

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="max-w-3xl w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight w-full">
          User Information
        </h2>
        <UserInformationTabs />

        <ProfileInfoCard defaultValues={profile} />
        <ContactInfoCard
          defaultValues={{
            id: profile.id,
            phoneNumber: profile.phoneNumber,
            email: session?.user?.email!,
          }}
        />
      </div>
    </div>
  );
};

export default UserDashboard;
