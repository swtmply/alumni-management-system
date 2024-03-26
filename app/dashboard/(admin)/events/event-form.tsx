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
import { Textarea } from "@/components/ui/textarea";
import { Link } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/app/lib/utils";
import { PutBlobResult } from "@vercel/blob";

export const eventFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  link: z.string().optional(),
  image: z.any().optional(),
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
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let imageUrl: string | undefined = undefined;

    if (values.image) {
      const fileResponse = await fetch(
        `/api/event/image/upload?filename=${values.image.name}`,
        {
          method: "POST",
          body: values.image,
        }
      );

      const newBlob = (await fileResponse.json()) as PutBlobResult;

      imageUrl = newBlob.url;
    }

    if (selectedDates !== undefined) {
      const response = await createEvent({
        ...values,
        start: addHours(
          addMinutes(selectedDates.start, time.start.minute || 0),
          time.start.hour || 0
        ),
        end: addHours(
          addMinutes(selectedDates.end, time.end.minute || 0),
          time.end.hour || 0
        ),
        image: imageUrl,
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
            <div className="flex gap-2 items-center">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>
                      Title<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Event Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem className="flex-shrink-0">
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <div className="py-1.5 cursor-pointer">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Link
                              className={cn(
                                field.value ? "text-blue-500" : "text-gray-500"
                              )}
                            />
                          </PopoverTrigger>
                          <PopoverContent>
                            <Input placeholder="Event Link" {...field} />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Event Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <div className="w-full">
                <p className="text-sm font-medium mb-2">Start</p>
                <div className="border rounded-md shadow-sm px-3 py-2 flex gap-1">
                  <DatePicker
                    defaultValue={parseDate(
                      format(selectedDates?.start || new Date(), "yyyy-MM-dd")
                    )}
                    onChange={(date) => {
                      if (!selectedDates) return;

                      setSelectedDates({
                        ...selectedDates,
                        start: date.toDate(
                          Intl.DateTimeFormat().resolvedOptions().timeZone
                        ),
                      });
                    }}
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
              </div>

              <div className="w-full">
                <p className="text-sm font-medium mb-2">End</p>
                <div className="border rounded-md shadow-sm px-3 py-2 flex gap-1">
                  <DatePicker
                    defaultValue={parseDate(
                      format(selectedDates?.end || new Date(), "yyyy-MM-dd")
                    )}
                    onChange={(date) => {
                      if (!selectedDates) return;

                      setSelectedDates({
                        ...selectedDates,
                        end: date.toDate(
                          Intl.DateTimeFormat().resolvedOptions().timeZone
                        ),
                      });
                    }}
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
              </div>
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      placeholder="Event Image"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
