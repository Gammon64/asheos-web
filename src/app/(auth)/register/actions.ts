"use server";

import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import z from "zod";
import { RegisterSchema, RegisterState } from "./definitions.schema";

export async function signup(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  // Valida os dados
  const validatedFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return z.treeifyError(validatedFields.error);
  }

  const { name, email, password } = validatedFields.data;

  try {
    // Chama o Backend
    await api.post("/auth/register", { name, email, password });
  } catch (error) {
    // Lida com erros (ex: 400 E-mail já existe)
    if (error instanceof AxiosError && error.response?.status === 400) {
      return { errors: ["Este e-mail já está cadastrado."] };
    }
    return { errors: ["Ocorreu um erro no servidor. Tente novamente."] };
  }

  redirect("/login");
}
