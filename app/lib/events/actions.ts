"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";
import { z } from "zod";
import { eventFormSchema } from "@/app/dashboard/(admin)/events/event-calendar";

export const createEvent = async (params: z.infer<typeof eventFormSchema>) => {
  try {
    const event = await prisma.event.create({
      data: {
        endDate: params.end!,
        startDate: params.start!,
        title: params.title,
      },
    });

    if (!event) return { message: "Something went wrong", ok: false };

    revalidatePath("/dashboard/events");
    return { message: "Event created successfully", ok: true };
  } catch (e) {
    console.log(e);
    return { matchMedia: "Something went wrong", ok: false };
  }
};
