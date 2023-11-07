"use server";

import { z } from "zod";
import { signIn, signOut } from ".";
import { registerFormSchema } from "@/components/register-form";
import { loginFormSchema } from "@/components/login-form";
import prisma from "../db";

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
    const { email, password } = params;

    // const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    if (user) return { message: "User created successfully" };
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  await signOut();
}
