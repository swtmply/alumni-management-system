import { auth } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import AddressInfoCard from "@/components/address-info-card";
import ContactInfoCard from "@/components/contact-info-card";
import ProfileForm from "@/components/profile-form";
import ProfileInfoCard from "@/components/profile-info-card";

import UserInformationTabs from "@/components/user-information-tabs";

const UserProfile = async ({ params }: { params: { userId: string } }) => {
  const session = await auth();

  const profile = await prisma.profile.findUnique({
    where: { userId: params.userId },
    include: {
      address: true,
    },
  });

  if (!profile)
    return (
      <div className="w-full flex flex-col">
        <div className="w-full">
          <h2 className="text-2xl font-bold tracking-tight w-full">
            Complete your profile
          </h2>
          <ProfileForm />
        </div>
      </div>
    );

  const user = await prisma.user.findUnique({
    where: { id: profile?.userId! },
  });

  const editable = session?.user?.id === user?.id;

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight w-full">
          User Information
        </h2>
        <UserInformationTabs />

        <div className="grid grid-cols-2 gap-2">
          <ProfileInfoCard
            defaultValues={profile}
            image={user?.image || ""}
            editable={editable}
          />
          <div className="flex flex-col gap-2">
            <AddressInfoCard
              defaultValues={profile.address}
              editable={editable}
              profileId={profile.id}
            />
            <ContactInfoCard
              defaultValues={{
                id: profile.id,
                phoneNumber: profile.phoneNumber,
                email: user?.email || "",
              }}
              editable={editable}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
