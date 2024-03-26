"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Dispatch, SetStateAction, useState } from "react";
import { TagInput } from "@/components/ui/tag-input";
import { Textarea } from "@/components/ui/textarea";
import { createJob } from "@/app/lib/jobs/actions";

export const addJobFormSchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  link: z.string().url({ message: "Job link must be a valid link" }),
  role: z.string().min(1, { message: "Job must have at least 1 role" }),
  skills: z
    .array(z.string())
    .min(1, { message: "Skills must have at least 1 skill" }),
  courses: z
    .array(z.string())
    .min(1, { message: "Courses must have at least 1 course" }),
  experience: z.coerce.number(),
  location: z.string().min(1, { message: "Job must have a location" }),
  salary: z.coerce.number(),
  contactDetails: z
    .array(z.string())
    .min(1, { message: "Contact must have at least 1 detail" }),
});

const AddJobModal = ({ label }: { label?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>{label || "Add Job"}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-max">
        <DialogHeader>
          <DialogTitle>{label || "Add Job"}</DialogTitle>
        </DialogHeader>
        <AddJobForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

function AddJobForm({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof addJobFormSchema>>({
    resolver: zodResolver(addJobFormSchema),
    defaultValues: {
      companyName: "",
      description: "",
      courses: [],
      skills: [],
      experience: 0,
      link: "",
      role: "",
      contactDetails: [],
      location: "",
      salary: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof addJobFormSchema>) => {
    const response = await createJob(values);
    if (response?.ok) {
      form.reset();
      setIsOpen(false);
    }
    toast({
      title: response?.message,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 flex flex-col"
      >
        <div className="flex gap-5">
          <div className="space-y-5">
            <h2 className="text-sm font-medium">Job Information</h2>
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter job link" {...field} />
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
                    <Textarea
                      placeholder="Job description for users"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter job location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contacts</FormLabel>
                  <FormControl>
                    <TagInput
                      {...field}
                      placeholder="Enter a contact (Press `enter` to submit) (email or phone number)"
                      tags={field.value}
                      className="sm:min-w-[450px]"
                      setTags={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="text-sm font-medium">Employee Information</h2>

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience Required</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter years of required experience"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter job role" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <TagInput
                      {...field}
                      placeholder="Enter a skill (Press `enter` to submit)"
                      tags={field.value}
                      className="sm:min-w-[450px]"
                      setTags={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Courses</FormLabel>
                  <FormControl>
                    <TagInput
                      {...field}
                      placeholder="Enter a course (Press `enter` to submit)"
                      tags={field.value}
                      className="sm:min-w-[450px]"
                      setTags={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter salary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          className="self-end"
          disabled={form.formState.isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default AddJobModal;
