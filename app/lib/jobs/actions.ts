"use server";

import { z } from "zod";
import { addJobFormSchema } from "@/components/table/jobs/add-job-modal";
import prisma from "../db";
import { revalidatePath } from "next/cache";
import { editJobFormSchema } from "@/components/table/jobs/edit-job-modal";

export const createJob = async (values: z.infer<typeof addJobFormSchema>) => {
  try {
    const job = await prisma.job.create({ data: values });

    if (!job) return { message: "Something went wrong", ok: false };

    revalidatePath("/dashboard/jobs");
    return { message: "Job Created Successfully", ok: true };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const updateJob = async (
  id: string,
  values: z.infer<typeof editJobFormSchema>
) => {
  try {
    const job = await prisma.job.update({ where: { id }, data: values });

    if (!job) return { message: "Something went wrong", ok: false };

    revalidatePath("/dashboard/jobs");
    return { message: "Job Updated Successfully", ok: true };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const deleteJob = async (id: string) => {
  try {
    const job = await prisma.job.delete({ where: { id } });

    if (!job) return { message: "Something went wrong", ok: false };

    revalidatePath("/dashboard/jobs");
    return { message: "Job Deleted Successfully", ok: true };
  } catch (e) {
    console.log(e);
    throw e;
  }
};
