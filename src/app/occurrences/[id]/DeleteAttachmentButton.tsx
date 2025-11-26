"use client"

import { deleteAttachment } from "@/actions/occurrences";
import DeleteButton from "@/components/DeleteButton";

const DeleteAttachmentButton = (
    { occurrenceId, attachmentId }: { occurrenceId: number; attachmentId: number }
) => {
    return (
        <DeleteButton onClick={() => deleteAttachment(occurrenceId, attachmentId) } className="bg-red-600 hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-900">
            Excluir
        </DeleteButton>
    )
}

export default DeleteAttachmentButton