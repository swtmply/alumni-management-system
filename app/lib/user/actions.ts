"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";
import { z } from "zod";
import { createProfileSchema } from "@/components/profile-form";
import { auth } from "../auth";
import { updatePersonalInfoSchema } from "@/components/profile-info-card";
import { updateContactInfoSchema } from "@/components/contact-info-card";

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

export async function createProfile(
  params: z.infer<typeof createProfileSchema>
) {
  try {
    const session = await auth();
    const createProfile = await prisma.profile.create({
      data: {
        userId: session?.user?.id,
        ...params,
      },
    });

    await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        name: `${params.firstName} ${params.lastName}`,
      },
    });

    if (createProfile) {
      revalidatePath("/dashboard", "layout");

      return { message: "User profile created successfully", ok: true };
    }
  } catch (error) {
    throw error;
  }
}

export async function updateProfile(
  profileId: string,
  params: z.infer<typeof updatePersonalInfoSchema>
) {
  try {
    const session = await auth();

    const { image, ...rest } = params;

    const updateProfile = await prisma.profile.update({
      where: {
        id: profileId,
      },
      data: rest,
    });

    await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        name: `${params.firstName} ${params.lastName}`,
        image,
      },
    });

    if (updateProfile) {
      revalidatePath("/dashboard", "layout");

      return { message: "User profile updated successfully", ok: true };
    }
  } catch (error) {
    throw error;
  }
}

export async function updateContact(
  profileId: string,
  params: z.infer<typeof updateContactInfoSchema>
) {
  try {
    const updateContact = await prisma.profile.update({
      where: {
        id: profileId,
      },
      data: params,
    });

    if (updateContact) {
      revalidatePath("/dashboard/user/profile");

      return { message: "User profile updated successfully", ok: true };
    }
  } catch (error) {
    throw error;
  }
}
