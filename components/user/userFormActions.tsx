"use server"

import AuthAPI from "@/api/authAPI";
import { createSession, deleteSession, verifySession } from "../session";
import { LoginFormSchema } from "@/types/loginFormSchema";
import { LoginFormState } from "@/types/loginFormState";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Bearer from "@/types/bearer";
import { RegisterFormState } from "@/types/registerFormState";
import { RegisterFormSchema } from "@/types/registerFormSchema";

export async function login(state: LoginFormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const bearer = await AuthAPI.Login(email.trim(), password.trim());

  if(bearer instanceof Error)
    return;

  await createSession(bearer);
}

export async function register(state: RegisterFormState, formData: FormData) {
  const validatedFields = RegisterFormSchema.safeParse({
      displayname: formData.get('displayname'),
      email: formData.get('email'),
      password: formData.get('password'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
      return {
          errors: validatedFields.error.flatten().fieldErrors,
      };
  }

  const { displayname, email, password } = validatedFields.data;

  const headersList = await headers();
  const callback = `${headersList.get('host')}/confirmemail`

  const result = await AuthAPI.Register(displayname.trim(), email.trim(), password.trim(), callback);

  if (result instanceof Error) {
      return {
          errors: {
              displayname: undefined,
              email: [result.message],
              password: undefined,
          },
      };
  }

  redirect("/confirmemail")
}

export async function logout() {
  const session = await verifySession();

  if (session) {
      await AuthAPI.Logout(session);
  }

  deleteSession();
}

export async function refresh() {
  const session = await verifySession();

  if (session) {
      const newSession = await AuthAPI.Refresh(session);

      if (session instanceof Error) {
          return session;
      }

      createSession(newSession as Bearer);
  }
}