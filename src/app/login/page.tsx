"use client";

import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Modal from "@/components/Modal";
import Link from "next/link";
import { useActionState } from "react";
import { login } from "./actions";
import { LoginState } from "./definitions.schema";

const LoginPage = () => {
  const initialState: LoginState = {};
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <Modal>
      <h1 className="text-2xl font-bold mb-6 text-center">🔐 Login - asheos</h1>
      <form action={formAction}>
        {/* Campo de Email */}
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            required
            placeholder="seu.email@exemplo.com"
          />
          {state.properties?.email &&
            state.properties.email.errors.map((error) => (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            ))}
        </div>

        {/* Campo de Senha */}
        <div className="mb-6">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" name="password" required />
          {state.properties?.password &&
            state.properties.password.errors.map((error) => (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            ))}
        </div>

        {/* Exibição de Erro */}
        {state.errors &&
          state.errors.map((error, index) => (
            <ErrorMessage key={index}>{error}</ErrorMessage>
          ))}

        {/* Botão de Envio */}
        <Button
          type="submit"
          disabled={pending}
          className={
            pending
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }
        >
          {pending ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-400">
        Não tem conta?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Cadastre-se
        </Link>
      </p>
    </Modal>
  );
};

export default LoginPage;
