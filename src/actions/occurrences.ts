"use server";

import { api } from "@/lib/axios";
import {
  AttachmentSchema,
  CreateOccurrenceState,
  OccurrenceSchema,
  StatusSchema,
  UpdateStatusState,
  UploadAttachmentState,
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

export async function deleteOccurrence(occurrenceId: number) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { errors: ["Usuário não autenticado."] };
  }

  try {
    // Chama o Backend (asheos-api)
    await api.delete(`/occurrences/${occurrenceId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("🚀 ~ deleteOccurrence ~ error:", error);
    return { errors: ["Erro da API ao deletar ocorrência."] };
  }

  // Limpa o cache da página de lista
  revalidatePath("/occurrences");

  // Redireciona de volta para a lista
  redirect("/occurrences");
}

export async function uploadAttachment(
  occurrenceId: number,
  prevState: UploadAttachmentState,
  formData: FormData
): Promise<UploadAttachmentState> {
  // Extrai os campos
  const dataToValidate = {
    file: formData.get("file"),
  };

  /// Valida os dados extraídos
  const validatedFields = AttachmentSchema.safeParse(dataToValidate);
  if (!validatedFields.success) {
    return z.treeifyError(validatedFields.error);
  }

  const { file } = validatedFields.data;
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { errors: ["Usuário não autenticado."] };
  }

  try {
    const backendFormData = new FormData();

    backendFormData.append("file", file, file.name);

    // Chama o Backend (asheos-api)
    await api.post(
      `/occurrences/${occurrenceId}/attachments`,
      backendFormData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("🚀 ~ uploadAttachment ~ error:", error);
    return { errors: ["Erro da API ao enviar o anexo."] };
  }

  // Limpa o cache da página de detalhes
  revalidatePath(`/occurrences/${occurrenceId}`);
  return {};
}

export async function downloadAttachment(
  occurrenceId: number,
  attachmentId: number
) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { errors: ["Usuário não autenticado."] };
  }

  try {
    // Chama o Backend (asheos-api)
    const response = await api.get(
      `/occurrences/${occurrenceId}/attachments/${attachmentId}/download`,
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "arraybuffer", // Diz ao Axios para buscar os bytes
      }
    );
    console.log(
      "🚀 ~ downloadAttachment ~ headers:",
      response.headers["content-disposition"]
        .split("filename=")[1]
        .replace(/"/g, "")
    );

    return {
      data: new Blob([response.data], {
        type: response.headers["content-type"],
      }),
      filename: response.headers["content-disposition"]
        ? response.headers["content-disposition"]
            .split("filename=")[1]
            .replace(/"/g, "")
        : "attachment",
    };
  } catch (error) {
    console.error("🚀 ~ uploadAttachment ~ error:", error);
    return { errors: ["Erro da API ao enviar o anexo."] };
  }
}

export async function deleteAttachment(
  occurrenceId: number,
  attachmentId: number
) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { errors: ["Usuário não autenticado."] };
  }

  try {
    // Chama o Backend (asheos-api)
    await api.delete(
      `/occurrences/${occurrenceId}/attachments/${attachmentId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("🚀 ~ deleteAttachment ~ error:", error);
    return { errors: ["Erro da API ao deletar o anexo."] };
  }

  // Limpa o cache da página de detalhes
  revalidatePath(`/occurrences/${occurrenceId}`);
  return {};
}
