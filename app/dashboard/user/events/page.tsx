import prisma from "@/app/lib/db";
import EventCalendar from "../../(admin)/events/event-calendar";

const EventsPage = async () => {
  const events = await prisma.event.findMany({});

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-4">
        Events Calendar
      </h2>
      <EventCalendar events={events} />
    </div>
  );
};

export default EventsPage;
