"use server";

import { z } from "zod";
import { signIn, signOut } from ".";
import { registerFormSchema } from "@/components/register-form";
import { loginFormSchema } from "@/components/login-form";
import prisma from "../db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export async function authenticate(params: z.infer<typeof loginFormSchema>) {
  try {
    await signIn("credentials", params);
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}

export async function register(params: z.infer<typeof registerFormSchema>) {
  try {
    const hashedPassword = await bcrypt.hash(params.password, 10);

    const user = await prisma.user.create({
      data: {
        ...params,
        password: hashedPassword,
      },
    });

    if (user) {
      revalidatePath("/dashboard/users");

      return { message: "User created successfully", ok: true };
    }
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  await signOut();
}
