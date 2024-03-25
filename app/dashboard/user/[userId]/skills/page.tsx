import { auth } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import AddSkillFormModal from "@/components/add-skill-form-modal";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import UserInformationTabs from "@/components/user-information-tabs";

const UserSkills = async ({ params }: { params: { userId: string } }) => {
  const session = await auth();

  const skills = await prisma.skill.findMany({
    where: { userId: params.userId },
  });

  const user = await prisma.user.findUnique({
    where: { id: params.userId },
  });

  const editable = session?.user?.id === user?.id;

  return (
    <div className="w-full flex flex-col">
      <div className=" w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight w-full">
          User Skills Information
        </h2>
        <UserInformationTabs />

        {editable && <AddSkillFormModal />}

        {skills.length === 0 && (
          <div>
            <h4 className="text-xl font-semibold">
              No skills information found.
            </h4>
          </div>
        )}

        <div className="grid grid-cols-4 gap-2">
          {skills.map((skill) => (
            <Card key={skill.id}>
              <CardHeader>
                <CardTitle>{skill.name}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSkills;
