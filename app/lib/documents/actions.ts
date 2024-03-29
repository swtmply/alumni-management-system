"use server";

import { z } from "zod";
import prisma from "../db";
import { revalidatePath } from "next/cache";
import { scheduleFormSchema } from "@/components/add-schedule-modal";
import { auth } from "../auth";

export async function createSchedule(
  params: z.infer<typeof scheduleFormSchema>
) {
  try {
    const session = await auth();
    const schedule = await prisma.schedule.create({
      data: {
        ...params,
        userId: session?.user?.id,
        status: "Pending",
      },
    });

    if (!schedule) return { message: "Something went wrong", ok: false };

    revalidatePath("/dashboard/user/documents");
    return { message: "Schedule created successfully", ok: true };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function updateSchedule(documentId: string, status: string) {
  try {
    const schedule = await prisma.schedule.update({
      where: {
        id: documentId,
      },
      data: {
        status,
      },
    });

    if (!schedule) return { message: "Something went wrong", ok: false };

    revalidatePath("/dashboard/documents");
    return { message: "Schedule updated successfully", ok: true };
  } catch (e) {
    console.log(e);
    throw e;
  }
}
