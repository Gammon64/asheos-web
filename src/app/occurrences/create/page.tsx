"use client";

import { createOccurrence } from "@/actions/occurrences";
import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import H1 from "@/components/H1";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Modal from "@/components/Modal";
import Textarea from "@/components/Textarea";
import { CreateOccurrenceState } from "@/zod/occurrences.definitions";
import { useActionState } from "react";

const OccurrenceCreate = () => {
  const initialState: CreateOccurrenceState = {};
  const [state, formAction, pending] = useActionState(
    createOccurrence,
    initialState
  );

  return (
    <Modal>
      <H1>Registrar Nova Ocorrência</H1>
      <form action={formAction} className="space-y-6">
        {/* Campo Título */}
        <div>
          <Label htmlFor="title">Título</Label>
          <Input id="title" name="title" type="text" required />
          {state.properties?.title &&
            state.properties.title.errors.map((error) => (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            ))}
        </div>

        {/* Campo Descrição */}
        <div>
          <Label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Descrição
          </Label>
          <Textarea
            id="description"
            name="description"
            rows={5}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
          {state.properties?.description &&
            state.properties.description.errors.map((error) => (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            ))}
        </div>

        {/* Exibição de Erro */}
        {state.errors &&
          state.errors.map((error, index) => (
            <ErrorMessage key={index}>{error}</ErrorMessage>
          ))}

        {/* Botão */}
        <Button
          type="submit"
          disabled={pending}
          className={
            pending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }
        >
          {pending ? "Criando..." : "Criar Ocorrência"}
        </Button>
      </form>
    </Modal>
  );
};

export default OccurrenceCreate;
