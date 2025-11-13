"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  // Deleta o cookie de autenticação
  (await cookies()).delete("token");

  // Redireciona o usuário para a página de login
  redirect("/login");
}
