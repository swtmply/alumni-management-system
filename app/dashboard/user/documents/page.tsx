import { auth } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import AddScheduleModal from "@/components/add-schedule-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zonedTimeToUtc, format } from "date-fns-tz";

const DocumentsPage = async () => {
  const session = await auth();

  const data = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: {
      schedules: true,
    },
  });

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="max-w-6xl w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight w-full">
          Request for documents
        </h2>
        <div className="flex gap-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Schedule Dates</CardTitle>
            </CardHeader>
            <CardContent>
              {data?.schedules?.map((schedule) => (
                <div
                  key={schedule.id}
                  className="w-full flex flex-col justify-between py-2 border-b border-bg"
                >
                  <p className="text-sm text-slate-500 mb-4">
                    {format(
                      zonedTimeToUtc(schedule.date, "Asia/Singapore"),
                      "PP",
                      { timeZone: "Asia/Singapore" }
                    )}
                  </p>
                  {schedule.documents.map((document) => (
                    <p
                      key={document + schedule.id}
                      className="tracking-tight font-medium"
                    >
                      {document}
                    </p>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
          <AddScheduleModal />
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
