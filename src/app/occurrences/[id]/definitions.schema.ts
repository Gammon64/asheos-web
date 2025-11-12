import { OccurrenceStatus } from "@/types/occurrence";
import z from "zod";

// Schema Zod para Atualizar Status
export const StatusSchema = z.object({
  status: z.enum(Object.values(OccurrenceStatus).map(String), {
    error: "Selecione um status.",
  }),
});

// Tipo de Estado do Formulário
export type UpdateStatusState = {
  errors?: string[];
  properties?: {
    status?: { errors: string[] };
  };
};
