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
import DatePicker from "./ui/date-picker";
import { createProfile } from "@/app/lib/user/actions";
import { useToast } from "./ui/use-toast";

export const createProfileSchema = z.object({
  studentNumber: z
    .string()
    .min(1, { message: "Student Number must have at least 1 character" }),
  firstName: z
    .string()
    .min(1, { message: "First Name must have at least 1 character" }),
  lastName: z
    .string()
    .min(1, { message: "Last Name must have at least 1 character" }),
  dateOfBirth: z.date(),
  phoneNumber: z
    .string({ required_error: "Phone is required" })
    .regex(/^\d+$/, { message: "Phone should not have alphabet characters." })
    .min(11, { message: "Phone must be at least 11 characters" }),
  course: z
    .string()
    .min(1, { message: "Course must have at least 1 character" }),
  yearOfGraduate: z
    .string()
    .min(1, { message: "Year of Graduation is required" }),
});

export default function ProfileForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof createProfileSchema>>({
    resolver: zodResolver(createProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      studentNumber: "",
      dateOfBirth: new Date(),
      phoneNumber: "",
      course: "",
      yearOfGraduate: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createProfileSchema>) => {
    const response = await createProfile(values);

    if (response?.ok) {
      form.reset();
    }
    toast({
      title: response?.message,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 mt-4 w-full"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studentNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student No.</FormLabel>
              <FormControl>
                <Input placeholder="Enter student number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <DatePicker field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <FormControl>
                <Input placeholder="Enter course" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="yearOfGraduate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year of Graduation</FormLabel>
              <FormControl>
                <Input placeholder="Enter year of graduation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
