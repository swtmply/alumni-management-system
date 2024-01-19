"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Card, CardContent } from "@/components/ui/card";

import { Event } from "@prisma/client";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core/index.js";
import EventFormModal from "./event-form";
import EventInfo from "./event-info";
import { isPast, isToday } from "date-fns";
import { useSession } from "next-auth/react";

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
            weekends={false}
            selectable={role === "admin"}
            select={(value) => {
              if (!isPast(value.start) || isToday(value.start)) {
                setSelectedDates(value);
              }
            }}
            eventClick={setSelectedEvent}
            events={events.map((event) => ({
              title: event.title,
              start: event.startDate || undefined,
              end: event.endDate || undefined,
              date: event.date || undefined,
            }))}
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: "short",
            }}
            eventClassNames="hover:cursor-pointer hover:bg-blue-500"
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
