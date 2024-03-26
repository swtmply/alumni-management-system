import EditJobModal from "./edit-job-modal";
import { Job } from "@prisma/client";
import DeleteJobModal from "./delete-job-modal";

const JobsRowActions = ({ job }: { job: Job }) => {
  return (
    <div className="space-y-2">
      <EditJobModal job={job} />
      <DeleteJobModal job={job} />
    </div>
  );
};

export default JobsRowActions;
