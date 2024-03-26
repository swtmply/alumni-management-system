import prisma from "@/app/lib/db";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ViewJobModal from "@/components/job-info-modal";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import AddJobModal from "@/components/table/jobs/add-job-modal";

async function UserHomePage({
  searchParams,
}: {
  searchParams: { search: string; course: string };
}) {
  const search = searchParams.search;
  const course = searchParams.course;

  const jobs = await prisma.job.findMany({
    orderBy: { updatedAt: "desc" },
    where: {
      OR: [
        {
          description: search
            ? { contains: search, mode: "insensitive" }
            : course
            ? undefined
            : { contains: "" },
        },
        {
          role: search
            ? { contains: search, mode: "insensitive" }
            : course
            ? undefined
            : { contains: "" },
        },
        { skills: search ? { hasSome: [search] } : undefined },
        { courses: course ? { hasSome: [course] } : undefined },
      ],
      NOT: {
        OR: [{ status: "rejected" }, { status: "pending" }],
      },
    },
  });

  const session = await auth();

  const profile = await prisma.profile.findUnique({
    where: { userId: session?.user?.id },
  });

  if (!profile) {
    redirect(`/dashboard/user/${session?.user?.id}/profile`);
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight w-full">Jobs</h2>
          <AddJobModal label="Recommend Job" />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <CardTitle>{job.companyName}</CardTitle>
                <CardDescription className="line-clamp-5">
                  {job.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-sm">
                  Job Title:
                  <span className="ml-2 text-red-500 text-base font-bold">
                    {job.role}
                  </span>
                </p>
                <div className="gap-2 my-2 flex flex-wrap">
                  {job.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
                <p className="font-medium text-sm">
                  Salary:
                  <span className="ml-2 text-green-500 text-base font-bold">
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "PHP",
                    }).format(job.salary)}
                  </span>
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex justify-end w-full">
                  <ViewJobModal job={job} />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        {jobs.length === 0 && (
          <p className="text-center text-gray-500">No jobs posted</p>
        )}
      </div>
    </div>
  );
}

export default UserHomePage;
