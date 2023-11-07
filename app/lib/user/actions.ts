"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";

export async function verifyUser(id: string) {
  try {
    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    if (updateUser) {
      revalidatePath("/dashboard/users");

      return { message: "User verified successfully", ok: true };
    }
  } catch (error) {
    throw error;
  }
}
