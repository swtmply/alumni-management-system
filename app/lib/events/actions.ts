"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";

export const createEvent = async (params: {
  title: string;
  image?: string;
  link?: string;
  description?: string;
  end: Date;
  start: Date;
}) => {
  try {
    const { end, start, ...rest } = params;

    const event = await prisma.event.create({
      data: {
        endDate: end,
        startDate: start,
        ...rest,
      },
    });

    if (!event) return { message: "Something went wrong", ok: false };

    revalidatePath("/dashboard/events");
    return { message: "Event created successfully", ok: true };
  } catch (e) {
    console.log(e);
    return { message: "Something went wrong", ok: false };
  }
};

export const deleteEvent = async (id: string) => {
  try {
    await prisma.event.delete({ where: { id } });

    revalidatePath("/dashboard/events");
    return { message: "Event deleted successfully", ok: true };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong", ok: false };
  }
};
