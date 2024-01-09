import { auth } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import UserInformationTabs from "@/components/user-information-tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddCareerFormModal from "@/components/add-career-form-modal";

const UserCareer = async ({ params }: { params: { userId: string } }) => {
  const session = await auth();

  const careers = await prisma.career.findMany({
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

        {editable && <AddCareerFormModal />}

        {careers.map((career) => (
          <Card key={career.id}>
            <CardHeader>
              <CardTitle>{career.companyName}</CardTitle>
              <CardDescription>
                {Intl.DateTimeFormat("PPP").format(career.startYear)} -{" "}
                {Intl.DateTimeFormat("PPP").format(career.endYear)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Position -{" "}
                <span className="text-blue-500 font-bold">
                  {career.position}
                </span>
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 items-start">
              <p className="text-slate-500 text-sm">Projects Done: </p>
              <ul>
                {career.projectsDone.map((project) => (
                  <li key={project}>{project}</li>
                ))}
              </ul>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserCareer;
