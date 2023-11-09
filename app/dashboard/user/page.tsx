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
import { Button } from "@/components/ui/button";
import ViewJobModal from "@/components/job-info-modal";

async function UserHomePage() {
  const jobs = await prisma.job.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="max-w-6xl w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight w-full">Jobs</h2>
        <div className="grid grid-cols-3">
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
      </div>
    </div>
  );
}

export default UserHomePage;
