"use client";

import { updateOccurrenceStatus } from "@/actions/occurrences";
import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import Label from "@/components/Label";
import Select from "@/components/Select";
import { OccurrenceStatus } from "@/types/occurrence";
import { UpdateStatusState } from "@/zod/occurrences.definitions";
import { useActionState } from "react";

type UpdateStatusFormProps = {
  occurrenceId: number;
  currentStatus: OccurrenceStatus;
};

const UpdateStatusForm = ({
  occurrenceId,
  currentStatus,
}: UpdateStatusFormProps) => {
  const initialState: UpdateStatusState = {};
  const updateStatusAction = updateOccurrenceStatus.bind(null, occurrenceId);
  const [state, formAction, pending] = useActionState(
    updateStatusAction,
    initialState
  );

  // Não permite alterar status se já estiver fechado
  if (currentStatus === OccurrenceStatus.CLOSED) {
    return (
      <p className="text-gray-600">
        Ocorrências fechadas não podem ser alteradas.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex items-end gap-4">
      <div>
        <Label htmlFor="status" >
          Novo Status
        </Label>
        <Select id="status" name="status" defaultValue={currentStatus}>
          {/* Só mostra opções válidas */}
          {currentStatus === "OPENED" && (
            <>
              <option value="OPENED">Aberta</option>
              <option value="IN_PROGRESS">Em Progresso</option>
              <option value="CLOSED">Fechada</option>
            </>
          )}
          {currentStatus === "IN_PROGRESS" && (
            <>
              <option value="IN_PROGRESS">Em Progresso</option>
              <option value="CLOSED">Fechada</option>
            </>
          )}
        </Select>
        {state.properties?.status &&
          state.properties.status.errors.map((error) => (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          ))}
      </div>

      <Button
        type="submit"
        disabled={pending}
        className={
          pending ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
        }
      >
        {pending ? "Salvando..." : "Salvar"}
      </Button>

      {/* Exibição de Erro */}
      {state.errors &&
        state.errors.map((error, index) => (
          <ErrorMessage key={index}>{error}</ErrorMessage>
        ))}
    </form>
  );
};

export default UpdateStatusForm;
