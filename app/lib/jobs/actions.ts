"use server";

import { z } from "zod";
import { addJobFormSchema } from "@/components/table/jobs/add-job-modal";
import prisma from "../db";
import { revalidatePath } from "next/cache";

export const createJob = async (values: z.infer<typeof addJobFormSchema>) => {
  try {
    const job = await prisma.jobs.create({ data: values });

    if (!job) return { message: "Something went wrong", ok: false };

    revalidatePath("/dashboard/jobs");
    return { message: "Job Created Successfully", ok: true };
  } catch (e) {
    console.log(e);
    throw e;
  }
};
