"use server";

import { FetchError, http } from "@/lib/fetch";
import {
  AttachmentSchema,
  CreateOccurrenceState,
  OccurrenceSchema,
  StatusSchema,
  UpdateStatusState,
  UploadAttachmentState,
} from "@/zod/occurrences.definitions";
import { revalidatePath } from "next/cache";
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

  try {
    // Chama o Backend (asheos-api)
    await http.post("/occurrences", { title, description });
  } catch (error) {
    if (error instanceof FetchError) {
      console.error("Erro da API:", error.response.data);
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

  try {
    // Chama o Backend (asheos-api)
    await http.patch(`/occurrences/${occurrenceId}/status?status=${status}`);
  } catch (error) {
    return { errors: ["Erro da API ao atualizar status."] };
  }

  // Limpa o cache da página de detalhes
  revalidatePath(`/occurrences/${occurrenceId}`);
  return {};
}

export async function deleteOccurrence(occurrenceId: number) {
  try {
    // Chama o Backend (asheos-api)
    await http.delete(`/occurrences/${occurrenceId}`);
  } catch (error) {
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

  try {
    const backendFormData = new FormData();

    backendFormData.append("file", file, file.name);

    // Chama o Backend (asheos-api)
    await http.post(
      `/occurrences/${occurrenceId}/attachments`,
      backendFormData
    );
  } catch (error) {
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
  try {
    // Chama o Backend (asheos-api)
    const response = await http.get(
      `/occurrences/${occurrenceId}/attachments/${attachmentId}/download`
    );

    const contentDisposition = response.headers.get("content-disposition");
    const filename = contentDisposition
      ? contentDisposition.split("filename=")[1].replace(/"/g, "")
      : "attachment";

    return {
      data: await response.blob(),
      filename,
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
  try {
    // Chama o Backend (asheos-api)
    await http.delete(
      `/occurrences/${occurrenceId}/attachments/${attachmentId}`
    );
  } catch (error) {
    return { errors: ["Erro da API ao deletar o anexo."] };
  }

  // Limpa o cache da página de detalhes
  revalidatePath(`/occurrences/${occurrenceId}`);
  return {};
}
