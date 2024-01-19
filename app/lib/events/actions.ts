"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";

export const createEvent = async (params: {
  title: string;
  end: Date;
  start: Date;
}) => {
  try {
    const event = await prisma.event.create({
      data: {
        endDate: params.end,
        startDate: params.start,
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
