import z from "zod";

export const LoginSchema = z.object({
  email: z
    .email({ message: "Por favor, insira um e-mail válido." })
    .and(z.string().nonempty("O e-mail é obrigatório.")),
  password: z.string().nonempty("A senha é obrigatória."),
});

// Estado para o formulário de Login
export type LoginState = {
  errors?: string[];
  properties?: {
    name?: { errors: string[] };
    email?: { errors: string[] };
    password?: { errors: string[] };
  };
};
