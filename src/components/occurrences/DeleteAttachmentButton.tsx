"use client"

import { deleteAttachment } from "@/actions/occurrences";
import DeleteButton from "@/components/DeleteButton";

const DeleteAttachmentButton = (
    { occurrenceId, attachmentId }: { occurrenceId: number; attachmentId: number }
) => {
    return (
        <DeleteButton onClick={() => deleteAttachment(occurrenceId, attachmentId)}>
            Excluir
        </DeleteButton>
    )
}

export default DeleteAttachmentButton