"use server";

import { api } from "@/lib/axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import z from "zod";
import { StatusSchema, UpdateStatusState } from "./definitions.schema";

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
