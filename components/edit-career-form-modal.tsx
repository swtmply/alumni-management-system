"use client";

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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DatePicker from "./ui/date-picker";
import { TagInput } from "./ui/tag-input";
import { useToast } from "./ui/use-toast";
import { updateCareer } from "@/app/lib/career/actions";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Career } from "@prisma/client";

export const careerFormSchema = z.object({
  companyName: z
    .string()
    .min(1, { message: "Company Name must have at least 1 character" }),
  position: z
    .string()
    .min(1, { message: "Position must have at least 1 character" }),
  startYear: z.date(),
  endYear: z.date(),
  present: z.boolean(),
  projectsDone: z
    .array(z.string())
    .min(1, { message: "Projects done must have at least 1" }),
  description: z
    .string()
    .min(1, { message: "Description must have at least 1 character" }),
});

interface EditCareerFormModalProps {
  defaultValues: Career;
}

export default function EditCareerFormModal({
  defaultValues,
}: EditCareerFormModalProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof careerFormSchema>>({
    resolver: zodResolver(careerFormSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof careerFormSchema>) => {
    const response = await updateCareer(defaultValues.id, values);

    toast({
      title: response?.message,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <DotsVerticalIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create career information</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <DatePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <DatePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="present"
              render={({ field }) => (
                <FormItem className="flex items-center gap-1">
                  <FormLabel>Present</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="!mt-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectsDone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Projects Done</FormLabel>
                  <FormControl>
                    <TagInput
                      {...field}
                      placeholder="Enter a project (Press `enter` to submit)"
                      tags={field.value}
                      setTags={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Job description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
