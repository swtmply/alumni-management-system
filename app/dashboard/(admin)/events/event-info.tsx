import { EventClickArg } from "@fullcalendar/core/index.js";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

type EventInfoProps = {
  selectedEvent: EventClickArg | undefined;
  setSelectedEvent: React.Dispatch<
    React.SetStateAction<EventClickArg | undefined>
  >;
};

const EventInfo = ({ selectedEvent, setSelectedEvent }: EventInfoProps) => {
  const session = useSession();
  const role = session.data?.user?.role;

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
          <DialogTitle>{selectedEvent?.event.title}</DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-foreground font-medium">Start</p>
          <p className="text-sm text-muted-foreground">
            {format(selectedEvent?.event.start || new Date(), "EEEE, LLLL dd")}
            <span className="font-bold">{" ⋅ "}</span>
            {selectedEvent?.event.start &&
              format(selectedEvent?.event.start, "h:mm a")}
          </p>
        </div>
        <div>
          <p className="text-foreground font-medium">End</p>
          <p className="text-sm text-muted-foreground">
            {format(selectedEvent?.event.end || new Date(), "EEEE, LLLL dd")}
            <span className="font-bold">{" ⋅ "}</span>
            {selectedEvent?.event.end &&
              format(selectedEvent?.event.end, "h:mm a")}
          </p>
        </div>

        {role === "admin" && (
          <div className="flex gap-2">
            <Button variant={"outline"}>Edit</Button>
            <Button variant={"destructive"}>Delete</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventInfo;
