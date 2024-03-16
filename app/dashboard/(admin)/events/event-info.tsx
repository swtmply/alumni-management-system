import { EventClickArg } from "@fullcalendar/core/index.js";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { deleteEvent } from "@/app/lib/events/actions";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";

type EventInfoProps = {
  selectedEvent: EventClickArg | undefined;
  setSelectedEvent: React.Dispatch<
    React.SetStateAction<EventClickArg | undefined>
  >;
};

const EventInfo = ({ selectedEvent, setSelectedEvent }: EventInfoProps) => {
  const session = useSession();
  const role = session.data?.user?.role;

  const { endDate, startDate, link, description, image } = selectedEvent
    ? selectedEvent.event.extendedProps
    : {
        endDate: new Date(),
        startDate: new Date(),
        link: null,
        description: null,
        image: null,
      };

  return (
    <Dialog
      open={selectedEvent !== undefined}
      onOpenChange={(value) => {
        if (!value) {
          setSelectedEvent(undefined);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          {image && (
            <div className="w-full h-48 relative mt-4 overflow-hidden rounded-md">
              <Image
                src={image}
                alt="Event Image"
                fill
                className="object-cover"
              />
            </div>
          )}

          <DialogTitle>{selectedEvent?.event.title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex justify-between">
          <div>
            <p className="text-foreground font-medium text-sm">Start</p>
            <p className="text-sm text-muted-foreground">
              {format(startDate || new Date(), "EEEE, LLLL dd")}
              <span className="font-bold">{" ⋅ "}</span>
              {startDate && format(startDate, "h:mm a")}
            </p>
          </div>
          <div>
            <p className="text-foreground font-medium text-sm">End</p>
            <p className="text-sm text-muted-foreground">
              {format(endDate || new Date(), "EEEE, LLLL dd")}
              <span className="font-bold">{" ⋅ "}</span>
              {endDate && format(endDate, "h:mm a")}
            </p>
          </div>
        </div>

        {role === "admin" && (
          <div className="flex gap-2">
            <Button
              onClick={async () => {
                const response = await deleteEvent(selectedEvent?.event.id!);

                toast({
                  title: response.message,
                });

                setSelectedEvent(undefined);
              }}
              variant={"destructive"}
            >
              Delete
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventInfo;
