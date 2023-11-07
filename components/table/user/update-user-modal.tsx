"use client";

import { verifyUser } from "@/app/lib/user/actions";
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

const UpdateUserModal = ({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify User</DialogTitle>
          <DialogDescription>
            Are you sure you want to verify this user?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button
            onClick={async () => {
              const response = await verifyUser(userId);

              if (response?.ok) {
                setIsOpen(false);
              }
              toast({
                title: response?.message,
              });
            }}
          >
            Verify User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserModal;
