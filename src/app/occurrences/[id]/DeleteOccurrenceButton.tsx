"use client"

import { deleteOccurrence } from "@/actions/occurrences";
import DeleteButton from "@/components/DeleteButton";

const DeleteOccurrenceButton = (
    { occurrenceId, }: { occurrenceId: number; }
) => {
    return (
        <DeleteButton onClick={() => deleteOccurrence(occurrenceId)}>
            Excluir
        </DeleteButton>
    )
}

export default DeleteOccurrenceButton