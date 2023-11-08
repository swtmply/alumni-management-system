"use client";

import { deleteJob } from "@/app/lib/jobs/actions";
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

interface DeleteJobModalProps {
  job: Job;
}

const DeleteJobModal = ({ job }: DeleteJobModalProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    const response = await deleteJob(job.id);
    if (response?.ok) {
      setIsOpen(false);
    }
    toast({
      title: response?.message,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button onClick={() => handleDelete()} variant={"destructive"}>
            Delete Job
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteJobModal;
