"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Card, CardContent } from "@/components/ui/card";

import { Event } from "@prisma/client";
import {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core/index.js";
import EventFormModal from "./event-form";
import EventInfo from "./event-info";
import { format, isPast, isToday, sub } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";

const EventContent = (event: EventContentArg) => {
  const { endDate, startDate, link, description } = event.event.extendedProps;

  if (event.event.extendedProps.image) {
    return (
      <div className="w-full border-l-4 border-green-500 pl-1 hover:bg-green-500/20">
        <div className="w-full h-20 relative overflow-hidden rounded-md">
          <Image
            src={event.event.extendedProps.image}
            alt="Event image"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {format(startDate, "hh:mm a")} - {format(endDate, "hh:mm a")}
        </p>
        <p className="text-sm font-semibold mb-0.5">{event.event.title}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-green-500/20 text-black w-full rounded-md px-2 py-1 hover:bg-green-500/40">
      <p className="text-xs text-muted-foreground mt-1">
        {format(startDate, "hh:mm a")} - {format(endDate, "hh:mm a")}
      </p>
      <p className="text-sm font-semibold">{event.event.title}</p>
      <p className="text-sm mb-0.5">{description}</p>
    </div>
  );
};

const EventCalendar = ({ events }: { events: Event[] }) => {
  const [selectedDates, setSelectedDates] = React.useState<DateSelectArg>();
  const [selectedEvent, setSelectedEvent] = React.useState<
    EventClickArg | undefined
  >();

  const session = useSession();
  const role = session.data?.user?.role;

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <FullCalendar
            height={700}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={role === "admin"}
            select={(value) => {
              if (!isPast(value.start) || isToday(value.start)) {
                setSelectedDates({
                  ...value,
                  end: sub(value.end, { days: 1 }),
                });
              }
            }}
            eventClick={setSelectedEvent}
            events={events.map((event) => ({
              ...event,
              start: event.startDate || undefined,
              end: event.endDate || undefined,
            }))}
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: "short",
            }}
            eventClassNames="hover:bg-transparent hover:cursor-pointer"
            eventContent={EventContent}
          />
        </CardContent>
      </Card>
      <EventFormModal
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
      />
      <EventInfo
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />
    </>
  );
};

export default EventCalendar;
