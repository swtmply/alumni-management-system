import { Button } from "@/components/ui/button";
import EditJobModal from "./edit-job-modal";
import { Job } from "@prisma/client";

const JobsRowActions = ({ job }: { job: Job }) => {
  return (
    <div className="space-x-2">
      <EditJobModal job={job} />
      <Button variant={"destructive"}>Delete</Button>
    </div>
  );
};

export default JobsRowActions;
