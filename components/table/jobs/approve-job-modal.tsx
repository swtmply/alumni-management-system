"use client";

import { deleteJob, updateJob } from "@/app/lib/jobs/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Job } from "@prisma/client";
import { useState } from "react";

interface ApproveJobModalProps {
  job: Job;
  children: React.ReactNode;
}

const ApproveJobModal = ({ job, children }: ApproveJobModalProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleReject = async () => {
    const response = await updateJob(job.id, {
      ...job,
      status: "rejected",
    });
    if (response?.ok) {
      setIsOpen(false);
    }
    toast({
      title: response?.message,
    });
  };

  const handleApprove = async () => {
    const response = await updateJob(job.id, {
      ...job,
      status: "approved",
    });
    if (response?.ok) {
      setIsOpen(false);
    }
    toast({
      title: response?.message,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            Choose an action to perform on this job.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button onClick={() => handleReject()} variant={"destructive"}>
            Reject Job
          </Button>
          <Button onClick={() => handleApprove()}>Approve Job</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveJobModal;
