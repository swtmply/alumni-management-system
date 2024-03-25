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
import EditCareerFormModal from "@/components/edit-career-form-modal";

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
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight w-full">
          User Career Information
        </h2>
        <UserInformationTabs />

        {editable && <AddCareerFormModal />}

        {careers.length === 0 && (
          <div>
            <h4 className="text-xl font-semibold">
              No career information found.
            </h4>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
          {careers.map((career) => (
            <Card key={career.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {career.companyName}{" "}
                  <span>
                    {career.present && (
                      <span className="text-green-500 bg-green-100 font-normal text-xs px-2 py-1 rounded-full ml-4">
                        Present
                      </span>
                    )}
                    <span>
                      {editable && (
                        <EditCareerFormModal defaultValues={career} />
                      )}
                    </span>
                  </span>
                </CardTitle>
                <CardDescription>
                  {Intl.DateTimeFormat("PPP").format(career.startYear)} -{" "}
                  {career.present
                    ? "Present"
                    : Intl.DateTimeFormat("PPP").format(career.endYear)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Position -{" "}
                  <span className="text-blue-500 font-bold">
                    {career.position}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {career.description}
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
    </div>
  );
};

export default UserCareer;
