"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { zonedTimeToUtc, format } from "date-fns-tz";

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
import { TagInput } from "@/components/ui/tag-input";
import { createSchedule } from "@/app/lib/documents/actions";
import { useToast } from "@/components/ui/use-toast";

export const scheduleFormSchema = z.object({
  date: z.date(),
  documents: z
    .array(z.string())
    .min(1, { message: "Document name is required" }),
});

const AddScheduleModal = () => {
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState<Date>();

  const form = useForm<z.infer<typeof scheduleFormSchema>>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      date: new Date(),
      documents: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof scheduleFormSchema>) => {
    const response = await createSchedule({
      date: selectedDay || new Date(),
      documents: values.documents,
    });

    if (response?.ok) {
      form.reset();
      setSelectedDay(undefined);
    }
    toast({
      title: response?.message,
    });
  };

  return (
    <>
      <Dialog
        open={!!selectedDay}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedDay(undefined);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Schedule a document on{" "}
              {format(
                zonedTimeToUtc(selectedDay || new Date(), "Asia/Singapore"),
                "P",
                { timeZone: "Asia/Singapore" }
              )}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="documents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Documents</FormLabel>
                    <FormControl>
                      <TagInput
                        setTags={field.onChange}
                        tags={field.value}
                        placeholder="Enter document/s"
                        {...field}
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
      <Card>
        <CardHeader>
          <CardTitle>Calendar </CardTitle>
          <CardDescription>
            Click a date to add a schedule for a document
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDay}
            onSelect={setSelectedDay}
            initialFocus
            className="p-0"
            modifiers={{
              disabled: [
                {
                  dayOfWeek: [0, 6],
                },
                {
                  before: new Date(),
                },
              ],
            }}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default AddScheduleModal;
