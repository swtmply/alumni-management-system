"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";
import { z } from "zod";
import { createProfileSchema } from "@/components/profile-form";
import { auth } from "../auth";
import { updatePersonalInfoSchema } from "@/components/profile-info-card";
import { updateContactInfoSchema } from "@/components/contact-info-card";
import { updateAddressSchema } from "@/components/address-info-card";
import cuid from "cuid";

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

    const { address, ...rest } = params;

    const createProfile = await prisma.profile.create({
      data: {
        userId: session?.user?.id,
        ...rest,
        address: {
          create: {
            ...address,
          },
        },
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
      data: {
        phoneNumber: params.phoneNumber,
      },
    });

    if (updateContact) {
      revalidatePath("/dashboard/user/profile");

      return { message: "User profile updated successfully", ok: true };
    }
  } catch (error) {
    throw error;
  }
}

export async function updateImage(image: string) {
  try {
    const session = await auth();

    await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        image,
      },
    });

    return { message: "User profile updated successfully", ok: true };
  } catch (error) {
    throw error;
  }
}

export async function updateAddress(
  addressId: string | undefined,
  params: z.infer<typeof updateAddressSchema>,
  profileId: string
) {
  try {
    const updateAddress = await prisma.address.upsert({
      where: {
        id: addressId || cuid(),
      },
      create: {
        ...params,
        profileId,
      },
      update: params,
    });

    if (updateAddress) {
      revalidatePath("/dashboard/user/profile");

      return { message: "User profile updated successfully", ok: true };
    }
  } catch (error) {
    throw error;
  }
}
