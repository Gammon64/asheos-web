"use client"

import { uploadAttachment } from "@/actions/occurrences";
import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import Input from "@/components/Input";
import Label from "@/components/Label";
import { UploadAttachmentState } from "@/zod/occurrences.definitions";
import { useActionState } from "react";

type UploadAttachmentFormProps = {
    occurrenceId: number;
}

const UploadAttachmentForm = ({ occurrenceId }: UploadAttachmentFormProps) => {
    const initialState: UploadAttachmentState = {};
    const updateStatusAction = uploadAttachment.bind(null, occurrenceId);
    const [state, formAction, pending] = useActionState(
        updateStatusAction,
        initialState
    );
    return (
        <form action={formAction} className="flex items-end gap-4">
            <div>
                <Label
                    htmlFor="status"
                >
                    Selecionar arquivo (Máx 10MB)
                </Label>
                <Input
                    id="file"
                    name="file"
                    type="file"
                    required
                />
                {state.properties?.file &&
                    state.properties.file.errors.map((error) => (
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
    )
}

export default UploadAttachmentForm