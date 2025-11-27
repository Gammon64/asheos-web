"use server";

import { FetchError, http } from "@/lib/fetch";
import {
  LoginSchema,
  LoginState,
  RegisterSchema,
  RegisterState,
} from "@/zod/auth.definitions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

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
    const response = await http.post("/auth/login", { email, password });
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
    if (error instanceof FetchError && error.response.status === 401) {
      return { errors: ["E-mail ou senha inválidos."] };
    }
    return { errors: ["Ocorreu um erro no servidor. Tente novamente."] };
  }

  redirect("/occurrences");
}

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
    await http.post("/auth/register", { name, email, password });
  } catch (error) {
    // Lida com erros (ex: 400 E-mail já existe)
    if (error instanceof FetchError && error.response.status === 400) {
      return { errors: ["Este e-mail já está cadastrado."] };
    }
    return { errors: ["Ocorreu um erro no servidor. Tente novamente."] };
  }

  redirect("/login");
}

export async function logout() {
  // Deleta o cookie de autenticação
  (await cookies()).delete("token");

  // Redireciona o usuário para a página de login
  redirect("/login");
}
