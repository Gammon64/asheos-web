import { OccurrenceStatus } from "@/types/occurrence";
import z from "zod";

// Schema Zod para Nova Ocorrência
export const OccurrenceSchema = z.object({
  title: z
    .string()
    .min(5, { message: "O título deve ter pelo menos 5 caracteres." }),
  description: z
    .string()
    .min(10, { message: "A descrição deve ter pelo menos 10 caracteres." }),
});

// Tipo de Estado do Formulário de cadastro
export type CreateOccurrenceState = {
  errors?: string[];
  properties?: {
    title?: { errors: string[] };
    description?: { errors: string[] };
  };
};

// Schema Zod para Atualizar Status
export const StatusSchema = z.object({
  status: z.enum(Object.values(OccurrenceStatus).map(String), {
    error: "Selecione um status.",
  }),
});

// Tipo de Estado do Formulário de status
export type UpdateStatusState = {
  errors?: string[];
  properties?: {
    status?: { errors: string[] };
  };
};
