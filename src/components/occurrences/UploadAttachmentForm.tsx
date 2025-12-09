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
        <form action={formAction} className="flex flex-col gap-4">
            <div>
                <Label
                    htmlFor="file"
                    className="block rounded border p-4 shadow-sm sm:p-6"
                >
                    <div className="flex items-center justify-center gap-4">
                        <span className="font-medium" > Selecionar arquivo (Máx 10MB) </span>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"></path>
                        </svg>
                    </div>
                </Label>
                {/* TODO: preview do arquivo */}
                <Input
                    id="file"
                    name="file"
                    type="file"
                    required
                    className="sr-only"
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