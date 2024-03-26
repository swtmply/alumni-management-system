import prisma from "@/app/lib/db";
import { JobsDataTable } from "@/components/table/jobs/jobs-data-table";
import { jobsColumns } from "@/components/table/jobs/jobs-table-columns";

const JobsPage = async () => {
  const jobs = await prisma.job.findMany({
    orderBy: { updatedAt: "desc" },
  });

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
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Jobs table</h2>
      <JobsDataTable columns={jobsColumns} data={jobs} courses={courses} />
    </div>
  );
};

export default JobsPage;
