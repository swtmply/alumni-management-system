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
import { updateContact } from "@/app/lib/user/actions";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const updateContactInfoSchema = z.object({
  phoneNumber: z
    .string({ required_error: "Phone is required" })
    .regex(/^\d+$/, { message: "Phone should not have alphabet characters." })
    .min(11, { message: "Phone must be at least 11 characters" }),
  email: z.string().email(),
});

interface ContactInfoProps {
  defaultValues: {
    id: string;
    phoneNumber: string;
    email: string;
  };
  editable?: boolean;
}

const ContactInfoCard = ({ defaultValues, editable }: ContactInfoProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);

  const form = useForm<z.infer<typeof updateContactInfoSchema>>({
    resolver: zodResolver(updateContactInfoSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof updateContactInfoSchema>) => {
    const response = await updateContact(defaultValues.id, values);

    toast({
      title: response?.message,
    });
    router.refresh();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-1/2">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter phone number"
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
              name="email"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-1/2">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} disabled />
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
      )}
    </Card>
  );
};

export default ContactInfoCard;
