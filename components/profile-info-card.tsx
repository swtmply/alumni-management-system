"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
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
import { updateProfile } from "@/app/lib/user/actions";
import { useToast } from "./ui/use-toast";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const updatePersonalInfoSchema = z.object({
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
  course: z
    .string()
    .min(1, { message: "Course must have at least 1 character" }),
  yearOfGraduate: z
    .string()
    .min(1, { message: "Year of Graduation is required" }),
});

interface ProfileFormProps {
  defaultValues: {
    id: string;
    firstName: string;
    lastName: string;
    studentNumber: string;
    course: string;
    yearOfGraduate: string;
    dateOfBirth: Date;
  };
}

const ProfileInfoCard = ({ defaultValues }: ProfileFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { update, data: session } = useSession();

  const form = useForm<z.infer<typeof updatePersonalInfoSchema>>({
    resolver: zodResolver(updatePersonalInfoSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof updatePersonalInfoSchema>) => {
    startTransition(async () => {
      const response = await updateProfile(defaultValues.id, values);

      toast({
        title: response?.message,
      });

      await update({ name: `${values.firstName} ${values.lastName}` });
      router.refresh();
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information - {session?.user?.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="personal-info-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 mt-4 w-full"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-1/2">First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter first name"
                      {...field}
                      disabled={disabled}
                    />
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
                    <Input
                      placeholder="Enter last name"
                      {...field}
                      disabled={disabled}
                    />
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
                    <DatePicker disabled={disabled} field={field} />
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
                    <Input
                      placeholder="Enter student number"
                      {...field}
                      disabled={disabled}
                    />
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
                    <Input
                      placeholder="Enter course"
                      {...field}
                      disabled={disabled}
                    />
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
                    <Input
                      placeholder="Enter year of graduation"
                      {...field}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex gap-2">
        {!disabled && (
          <Button variant={"outline"} onClick={() => setDisabled(true)}>
            Cancel
          </Button>
        )}
        <Button
          onClick={() => setDisabled((prev) => !prev)}
          variant={!disabled ? "default" : "outline"}
          form="personal-info-form"
          type={!disabled ? "button" : "submit"}
        >
          {!disabled ? "Save Changes" : "Edit Personal Information"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileInfoCard;
