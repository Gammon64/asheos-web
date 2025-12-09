import z from "zod";

// Schema Zod para Endereço
export const AddressSchema = z.object({
  street: z.string().nonempty({ message: "O campo 'rua' é obrigatório." }),
  city: z.string().nonempty({ message: "O campo 'cidade' é obrigatório." }),
  state: z
    .string()
    .toUpperCase()
    .nonempty({ message: "O campo 'estado' é obrigatório." })
    .length(2, {
      message: "O campo 'estado' deve conter apenas 2 caracteres.",
    })
    .regex(/^[A-Z]{2}$/, "Sigla de estado inválida (ex: SP)"),
  zipCode: z
    .string()
    .nonempty({ message: "O campo 'CEP' é obrigatório." })
    .min(1, "CEP é obrigatório")
    // Aceita "12345-678" ou "12345678"
    .regex(
      /^\d{5}-?\d{3}$/,
      "CEP inválido. Use o formato 00000-000 ou apenas números."
    ),
});

// Estado para o formulário de Endereço
export type AddressState = {
  success?: boolean;
  errors?: string[];
  properties?: {
    street?: { errors: string[] };
    city?: { errors: string[] };
    state?: { errors: string[] };
    zipCode?: { errors: string[] };
  };
};
