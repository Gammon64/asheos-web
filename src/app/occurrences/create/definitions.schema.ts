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

// Tipo de Estado do Formulário
export type CreateOccurrenceState = {
  errors?: string[];
  properties?: {
    title?: { errors: string[] };
    description?: { errors: string[] };
  };
};
