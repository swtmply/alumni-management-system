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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
  address: z.object({
    street: z.string({ required_error: "Street is required" }),
    city: z.string({ required_error: "City is required" }),
    state: z.string({ required_error: "State is required" }),
    zip: z.string({ required_error: "Zip is required" }),
  }),
});

export default function ProfileForm() {
  const { toast } = useToast();
  const { update } = useSession();
  const router = useRouter();

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
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof createProfileSchema>) => {
    const response = await createProfile(values);

    if (response?.ok) {
      form.reset();

      await update({ name: `${values.firstName} ${values.lastName}` });
      router.refresh();
    }
    toast({
      title: response?.message,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-2 mt-4"
        id="profile-form"
      >
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-1/2">First Name</FormLabel>
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
                <FormItem className="flex items-center">
                  <FormLabel className="w-1/2">Last Name</FormLabel>
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
                <FormItem className="flex items-center">
                  <FormLabel className="w-1/2">Student No.</FormLabel>
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
                <FormItem className="flex items-center">
                  <FormLabel className="w-1/2">Date of Birth</FormLabel>
                  <FormControl>
                    <DatePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-1/2">Course</FormLabel>
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
                <FormItem className="flex items-center">
                  <FormLabel className="w-1/2">Year of Graduation</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter year of graduation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex flex-col gap-2">
          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <FormField
                name="address.street"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-1/2">Street</FormLabel>
                    <FormControl>
                      <Input placeholder="House No, Barangay" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="address.city"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-1/2">City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="address.state"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-1/2">Province</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter province" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="address.zip"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-1/2">Zip</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter zip" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-1/2">Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>
        <Button className="col-span-2 mt-2" form="profile-form" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
