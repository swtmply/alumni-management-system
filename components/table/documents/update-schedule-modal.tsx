"use client";

import { updateSchedule } from "@/app/lib/documents/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const UpdateDocumentApprovalModal = ({
  children,
  documentId,
}: {
  children: React.ReactNode;
  documentId: string;
}) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
          <DialogDescription>
            Select status to update the selected schedule
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button
            variant={"destructive"}
            onClick={async () => {
              const response = await updateSchedule(documentId, "Rejected");

              if (response?.ok) {
                setIsOpen(false);
              }
              toast({
                title: response?.message,
              });
            }}
          >
            Reject Request
          </Button>
          <Button
            onClick={async () => {
              const response = await updateSchedule(documentId, "Approved");

              if (response?.ok) {
                setIsOpen(false);
              }
              toast({
                title: response?.message,
              });
            }}
          >
            Approve Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDocumentApprovalModal;
