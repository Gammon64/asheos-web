"use server";

import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import { LoginSchema, LoginState } from "./definitions.schema";

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  // Extrai apenas os campos que queremos validar do FormData
  const dataToValidate = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // Valida os dados extraídos
  const validatedFields = LoginSchema.safeParse(dataToValidate);
  if (!validatedFields.success) {
    return z.treeifyError(validatedFields.error);
  }

  const { email, password } = validatedFields.data;

  try {
    // Chama o Backend
    const response = await api.post("/auth/login", { email, password });
    const { token } = response.data;

    // Define o Cookie HttpOnly
    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 dia (expiração do seu JWT)
    });
  } catch (error) {
    console.error("🚀 ~ login ~ error:", error);
    // Lida com erros (ex: 401 do backend)
    if (error instanceof AxiosError && error.response?.status === 401) {
      return { errors: ["E-mail ou senha inválidos."] };
    }
    return { errors: ["Ocorreu um erro no servidor. Tente novamente."] };
  }

  redirect("/occurrences");
}
