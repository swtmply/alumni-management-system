"use server";

import { careerFormSchema } from "@/components/add-career-form-modal";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "../db";
import { auth } from "../auth";

export async function createCareer(params: z.infer<typeof careerFormSchema>) {
  try {
    const session = await auth();

    const career = await prisma.career.create({
      data: {
        ...params,
        userId: session?.user?.id,
      },
    });

    if (!career) return { message: "Something went wrong", ok: false };

    revalidatePath("/dashboard/user/[userId]/career");
    return { message: "Career created successfully", ok: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateCareer(
  id: string,
  params: z.infer<typeof careerFormSchema>
) {
  try {
    const session = await auth();

    const career = await prisma.career.update({
      where: { id },
      data: {
        ...params,
        userId: session?.user?.id,
      },
    });

    if (!career) return { message: "Something went wrong", ok: false };

    revalidatePath("/dashboard/user/[userId]/career");
    return { message: "Career updated successfully", ok: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
