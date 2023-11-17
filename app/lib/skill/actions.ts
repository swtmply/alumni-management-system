"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "../db";
import { auth } from "../auth";
import { skillFormSchema } from "@/components/add-skill-form-modal";

export async function createSkill(params: z.infer<typeof skillFormSchema>) {
  try {
    const session = await auth();

    const skill = await prisma.skill.create({
      data: {
        ...params,
        userId: session?.user?.id,
      },
    });

    if (!skill) return { message: "Something went wrong", ok: false };

    revalidatePath("/dashboard/user/[userId]/skill");
    return { message: "Skill created successfully", ok: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
