import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DateSelectArg } from "@fullcalendar/core/index.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addHours, addMinutes, format } from "date-fns";
import { createEvent } from "@/app/lib/events/actions";
import { toast } from "@/components/ui/use-toast";

import {
  TimeField,
  Label,
  DateInput,
  DateSegment,
  DatePicker,
  TimeValue,
} from "react-aria-components";
import { parseDate } from "@internationalized/date";
import React from "react";
import { DateClickArg } from "@fullcalendar/interaction/index.js";

export const eventFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

type EventFormModalProps = {
  selectedDates: DateSelectArg | undefined;
  setSelectedDates: React.Dispatch<
    React.SetStateAction<DateSelectArg | undefined>
  >;
};

const EventFormModal = ({
  selectedDates,
  setSelectedDates,
}: EventFormModalProps) => {
  const [time, setTime] = React.useState({
    start: {} as TimeValue,
    end: {} as TimeValue,
  });

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    if (selectedDates !== undefined) {
      const response = await createEvent({
        title: values.title,
        start: addHours(
          addMinutes(selectedDates.start, time.start.minute || 0),
          time.start.hour || 0
        ),
        end: addHours(
          addMinutes(selectedDates.end, time.end.minute || 0),
          time.end.hour || 0
        ),
      });

      toast({
        title: response.message,
      });

      setSelectedDates(undefined);
    }
  }

  return (
    <Dialog
      open={selectedDates !== undefined}
      onOpenChange={(open) => {
        if (!open) {
          setSelectedDates(undefined);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Event on Dates</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Event Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-sm font-medium mb-2">Start</p>
            <div className="border rounded-md shadow-sm px-3 py-2 flex gap-1">
              <DatePicker
                defaultValue={parseDate(
                  format(selectedDates?.start || new Date(), "yyyy-MM-dd")
                )}
              >
                <Label className="sr-only">Date</Label>
                <DateInput className="flex">
                  {(segment) => (
                    <DateSegment className="text-sm" segment={segment} />
                  )}
                </DateInput>
              </DatePicker>
              <TimeField
                onChange={(value) => {
                  setTime({
                    ...time,
                    start: value,
                  });
                }}
              >
                <Label className="sr-only">Event time</Label>
                <DateInput className="flex">
                  {(segment) => (
                    <DateSegment className="text-sm" segment={segment} />
                  )}
                </DateInput>
              </TimeField>
            </div>
            <p className="text-sm font-medium mb-2">End</p>
            <div className="border rounded-md shadow-sm px-3 py-2 flex gap-1">
              <DatePicker
                defaultValue={parseDate(
                  format(selectedDates?.end || new Date(), "yyyy-MM-dd")
                )}
              >
                <Label className="sr-only">Date</Label>
                <DateInput className="flex">
                  {(segment) => (
                    <DateSegment className="text-sm" segment={segment} />
                  )}
                </DateInput>
              </DatePicker>
              <TimeField
                onChange={(value) => {
                  setTime({
                    ...time,
                    end: value,
                  });
                }}
              >
                <Label className="sr-only">Event time</Label>
                <DateInput className="flex">
                  {(segment) => (
                    <DateSegment className="text-sm" segment={segment} />
                  )}
                </DateInput>
              </TimeField>
            </div>
            <Button disabled={form.formState.isSubmitting} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EventFormModal;
