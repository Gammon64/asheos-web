"use client";

import Button from "@/components/Button";
import H1 from "@/components/H1";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Modal from "@/components/Modal";
import { useActionState } from "react";
import { signup } from "./actions";
import { RegisterState } from "./definitions.schema";

const RegisterPage = () => {
  const initialState: RegisterState = {};
  const [state, formAction, pending] = useActionState(signup, initialState);

  return (
    <Modal>
      <H1>📝 Criar Conta - asheos</H1>
      <form action={formAction}>
        {/* Campo Nome */}
        <div className="mb-4">
          <Label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="name"
          >
            Nome
          </Label>
          <Input
            id="name"
            type="text"
            name="name"
            required
            placeholder="Seu nome completo"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {state.properties?.name &&
            state.properties.name.errors.map((error) => (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            ))}
        </div>

        {/* Campo de Email */}
        <div className="mb-4">
          <Label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="email"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="seu.email@exemplo.com"
          />
          {state.properties?.email &&
            state.properties.email.errors.map((error) => (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            ))}
        </div>

        {/* Campo de Senha */}
        <div className="mb-6">
          <Label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="password"
          >
            Senha
          </Label>
          <Input
            id="password"
            type="password"
            name="password"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {state.properties?.password &&
            state.properties.password.errors.map((error) => (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            ))}
        </div>

        {/* Exibição de Erro */}
        {state.errors &&
          state.errors.map((error) => (
            <p className="text-red-500 text-sm mb-4 p-2 bg-red-100 border border-red-400 rounded">
              {error}
            </p>
          ))}

        <Button
          type="submit"
          disabled={pending}
          className={
            pending
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }
        >
          {pending ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Já tem conta?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Fazer login
        </a>
      </p>
    </Modal>
  );
};

export default RegisterPage;
