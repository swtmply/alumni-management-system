import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Job } from "@prisma/client";
import { Link2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";

const ViewJobModal = ({ job }: { job: Job }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Job</Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>View Job</DialogTitle>
        </DialogHeader>
        <ViewJobForm job={job} />
      </DialogContent>
    </Dialog>
  );
};

function ViewJobForm({ job }: { job: Job }) {
  return (
    <div className="flex gap-5">
      <div className="space-y-5 w-1/2">
        <h2 className="text-sm font-medium">Job Information</h2>
        {/* company name */}
        <div>
          <p className="text-sm font-medium">Company Name</p>
          <p className="text-red-500 font-bold">{job.companyName}</p>
        </div>
        {/* link */}
        <div>
          <p className="text-sm font-medium">Job Link</p>
          <Link
            href={job.link}
            target="_blank"
            className="text-blue-500 flex gap-1"
          >
            <Link2 />
            Visit Site
          </Link>
        </div>
        {/* description */}
        <div>
          <p className="text-sm font-medium">Job Description</p>
          <p className="text-slate-600 text-sm">{job.description}</p>
        </div>
        {/* location */}
        <div>
          <p className="text-sm font-medium">Company Location</p>
          <p className="text-slate-600">{job.location}</p>
        </div>
        {/* contact details */}
        <div>
          <p className="text-sm font-medium">Contact Details</p>
          <div className="text-slate-600 flex gap-2 flex-wrap mt-2">
            {job.contactDetails.map((contact) => (
              <Badge key={contact} variant={"outline"}>
                {contact}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 w-1/2">
        <h2 className="text-sm font-medium">Employee Information</h2>
        {/* Salary */}
        <div>
          <p className="text-sm font-medium">Salary</p>
          <p className="text-green-500 text-base font-bold">
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "PHP",
            }).format(job.salary)}
          </p>
        </div>
        {/* years of experience */}
        <div>
          <p className="text-sm font-medium">Years of Experience</p>
          <p className="text-slate-600">{job.experience}</p>
        </div>
        {/* role */}
        <div>
          <p className="text-sm font-medium">Job Role</p>
          <p className="text-slate-600">{job.role}</p>
        </div>
        {/* skills */}
        <div>
          <p className="text-sm font-medium">Skill Required</p>
          <div className="text-slate-600 flex gap-2 flex-wrap mt-2">
            {job.skills.map((skill) => (
              <Badge key={skill} variant={"outline"}>
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        {/* Courses */}
        <div>
          <p className="text-sm font-medium">Related Course</p>
          <div className="text-slate-600 flex gap-2 flex-wrap mt-2">
            {job.courses.map((course) => (
              <Badge key={course} variant={"outline"}>
                {course}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewJobModal;
