"use server";

import { api } from "@/lib/axios";
import {
  CreateOccurrenceState,
  OccurrenceSchema,
  StatusSchema,
  UpdateStatusState,
} from "@/zod/occurrences.definitions";
import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

export async function createOccurrence(
  prevState: CreateOccurrenceState,
  formData: FormData
): Promise<CreateOccurrenceState> {
  // Extrai os campos
  const dataToValidate = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  /// Valida os dados extraídos
  const validatedFields = OccurrenceSchema.safeParse(dataToValidate);
  if (!validatedFields.success) {
    return z.treeifyError(validatedFields.error);
  }

  const { title, description } = validatedFields.data;
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { errors: ["Usuário não autenticado."] };
  }

  try {
    // Chama o Backend (asheos-api)
    await api.post(
      "/occurrences",
      { title, description },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Erro da API:", error.response?.data);
      return { errors: ["Erro da API ao criar ocorrência."] };
    }
    return { errors: ["Ocorreu um erro no servidor. Tente novamente."] };
  }

  // Limpa o cache da página de lista (para que ela busque os novos dados)
  revalidatePath("/occurrences");

  // Redireciona de volta para a lista
  redirect("/occurrences");
}

export async function updateOccurrenceStatus(
  occurrenceId: number,
  prevState: UpdateStatusState,
  formData: FormData
): Promise<UpdateStatusState> {
  // Extrai os campos
  const dataToValidate = {
    status: formData.get("status"),
  };

  /// Valida os dados extraídos
  const validatedFields = StatusSchema.safeParse(dataToValidate);
  if (!validatedFields.success) {
    return z.treeifyError(validatedFields.error);
  }

  const { status } = validatedFields.data;
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { errors: ["Usuário não autenticado."] };
  }

  try {
    // Chama o Backend (asheos-api)
    await api.patch(
      `/occurrences/${occurrenceId}/status`,
      null, // O corpo é nulo
      {
        params: { status }, // O status vai como Query Param
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    return { errors: ["Erro da API ao atualizar status."] };
  }

  // Limpa o cache da página de detalhes
  revalidatePath(`/occurrences/${occurrenceId}`);
  return {};
}
