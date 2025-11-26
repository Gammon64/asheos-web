"use client"

import { downloadAttachment } from "@/actions/occurrences";
import Button from "@/components/Button";

const DownloadAttachmentButton = (
    { occurrenceId, attachmentId }: { occurrenceId: number; attachmentId: number }
) => {
    const getDownloadAttachment = async (
        occurrenceId: number,
        attachmentId: number
    ) => {
        const attachment = await downloadAttachment(occurrenceId, attachmentId);
        if (attachment.data) {
            const url = window.URL.createObjectURL(attachment.data);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", attachment.filename); // You can set the file name here
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        }
    }

    return (
        <Button onClick={() => getDownloadAttachment(occurrenceId, attachmentId)}
        className="bg-green-600 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-900">
            Baixar
        </Button>
    )
}

export default DownloadAttachmentButton 