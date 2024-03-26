"use client";

import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Address } from "@prisma/client";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { updateAddress } from "@/app/lib/user/actions";

export const updateAddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
});

interface AddressInfoProps {
  defaultValues: Address | null;
  editable?: boolean;
  profileId: string;
}

const AddressInfoCard = ({
  editable,
  defaultValues,
  profileId,
}: AddressInfoProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);

  const form = useForm<z.infer<typeof updateAddressSchema>>({
    resolver: zodResolver(updateAddressSchema),
    defaultValues: defaultValues || {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof updateAddressSchema>) => {
    const response = await updateAddress(defaultValues?.id, values, profileId);

    if (response?.ok) {
      toast({
        title: response.message,
      });
      setDisabled(true);
    } else {
      toast({
        title: "Failed to update Address Information",
      });
    }

    router.refresh();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Address Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="address-info-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 mt-4 w-full"
          >
            <FormField
              name="street"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-1/2">Street</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="House No, Barangay"
                      {...field}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="city"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-1/2">City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter city"
                      {...field}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="state"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-1/2">Province</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter province"
                      {...field}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="zip"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-1/2">Zip</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter zip"
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
            <Button variant={"outline"} onClick={() => setDisabled(true)}>
              Cancel
            </Button>
          )}
          <Button
            disabled={form.formState.isSubmitting}
            onClick={() => setDisabled((prev) => !prev)}
            variant={!disabled ? "default" : "outline"}
            form="address-info-form"
            type={!disabled ? "button" : "submit"}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="animate-spin mr-2" />
            )}
            {!disabled ? "Save Changes" : "Edit Address Information"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AddressInfoCard;
