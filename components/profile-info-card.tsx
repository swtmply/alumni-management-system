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
import { updateImage, updateProfile } from "@/app/lib/user/actions";
import { useToast } from "./ui/use-toast";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { PutBlobResult } from "@vercel/blob";

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
  image: z.string().optional(),
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
  editable?: boolean;
  image?: string;
}

const ProfileInfoCard = ({
  defaultValues,
  editable = true,
  image,
}: ProfileFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const { update } = useSession();

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [preview, setPreview] = useState<File>();

  const form = useForm<z.infer<typeof updatePersonalInfoSchema>>({
    resolver: zodResolver(updatePersonalInfoSchema),
    defaultValues: {
      ...defaultValues,
      image,
    },
  });

  const onSubmit = async (values: z.infer<typeof updatePersonalInfoSchema>) => {
    const file = inputFileRef.current?.files?.[0];

    if (file) {
      const fileResponse = await fetch(
        `/api/avatar/upload?filename=${file?.name}`,
        {
          method: "POST",
          body: file,
        }
      );

      const newBlob = (await fileResponse.json()) as PutBlobResult;

      setBlob(newBlob);

      await updateImage(newBlob.url);

      await update({
        picture: newBlob.url,
      });
    }

    const response = await updateProfile(defaultValues.id, values);

    await update({
      name: `${values.firstName} ${values.lastName}`,
    });

    toast({
      title: response?.message,
    });

    router.refresh();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
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
              name="image"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-1/2">Image</FormLabel>
                  <FormControl>
                    <div
                      className="w-32 h-32 rounded-full bg-slate-300 relative"
                      onClick={() => inputFileRef.current?.click()}
                    >
                      <Image
                        src={
                          (preview && URL.createObjectURL(preview)) ||
                          image ||
                          blob?.url ||
                          "/images/placeholder.jpg"
                        }
                        alt="Profile Icon"
                        fill
                        className="rounded-full"
                      />
                      <Input
                        type="file"
                        accept="image/*"
                        placeholder="Enter first name"
                        onChange={(e) => {
                          field.onChange(e);

                          const file = e.target.files?.[0];
                          setPreview(file);
                        }}
                        ref={inputFileRef}
                        disabled={disabled}
                        className="hidden"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
      {editable && (
        <CardFooter className="flex gap-2">
          {!disabled && (
            <Button
              variant={"outline"}
              onClick={() => {
                form.reset();
                setPreview(undefined);
                setDisabled(true);
              }}
            >
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
      )}
    </Card>
  );
};

export default ProfileInfoCard;
