import Button from "@/components/Button";
import H1 from "@/components/H1";
import Modal from "@/components/Modal";
import Card from "@/components/occurrences/Card";
import Chip from "@/components/occurrences/Chip";
import { api } from "@/lib/axios";
import { Occurrence } from "@/types/occurrence";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import UpdateStatusForm from "./UpdateStatusForm";
import UploadAttachmentForm from "./UploadAttachmentForm";
import DownloadAttachmentButton from "./DownloadAttachmentButton";

const getOccurrenceById = async (id: string): Promise<Occurrence | null> => {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const response = await api.get(`/occurrences/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Falha ao buscar ocorrências:", error);
    return null;
  }
};

type OccurrencePageProps = {
  params: Promise<{
    id: string;
  }>;
};
const OccurrencePage = async ({ params }: OccurrencePageProps) => {
  const occurrence = await getOccurrenceById((await params).id);

  if (!occurrence) notFound();

  return (
    <Modal>
      <div className="mb-4">
        <Link href="/occurrences" className="text-blue-600 hover:underline">
          &larr; Voltar para Ocorrências
        </Link>
      </div>
      {/* Cabeçalho */}
      <Card>
        <div className="flex justify-between items-start">
          <H1>{occurrence.title}</H1>
          <Chip status={occurrence.status} />
        </div>
        <div className="text-sm text-gray-500 mt-2">
          Reportado por:{" "}
          <span className="font-medium text-gray-700">
            {occurrence.reportedBy.name}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          Data:{" "}
          {new Date(occurrence.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </div>
      </Card>

      {/* Descrição */}
      <Card>
        <h2 className="text-xl font-semibold mb-3">Descrição</h2>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {occurrence.description}
        </p>
      </Card>

      {/* Formulário de Atualização de Status */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Atualizar Status</h2>
        <UpdateStatusForm
          occurrenceId={occurrence.id}
          currentStatus={occurrence.status}
        />
      </Card>

      {/* Seção de Anexos */}
      <Card className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold mb-4">Anexos</h2>

        <div className="flex flex-col gap-2">
          {occurrence.attachments.map((attachment) => (
            <div key={attachment.id} className="flex flex-col items-center justify-between p-2 max-w-full border rounded-md break-all">
              <p className="w-full">{attachment.fileName}</p>
              <div className="flex w-full justify-end">
                <DownloadAttachmentButton
                  occurrenceId={occurrence.id}
                  attachmentId={attachment.id} 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Formulário de Upload */}
        <h3 className="text-lg font-semibold mb-3 pt-4 border-t">Novo Anexo</h3>
        <UploadAttachmentForm occurrenceId={occurrence.id} />
      </Card>
    </Modal>
  );
};

export default OccurrencePage;
