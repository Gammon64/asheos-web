import z from "zod";

// Schema Zod para Login
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

// Schema Zod para Registro
export const RegisterSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
  email: z.email({ message: "Por favor, insira um e-mail válido." }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

// Estado para o formulário de Registro
export type RegisterState = {
  errors?: string[];
  properties?: {
    name?: { errors: string[] } | undefined;
    email?: { errors: string[] } | undefined;
    password?: { errors: string[] } | undefined;
  };
};
