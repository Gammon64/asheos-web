import H1 from "@/components/H1";
import Modal from "@/components/Modal";
import Chip from "@/components/occurrences/Chip";
import { http } from "@/lib/fetch";
import { Occurrence } from "@/types/occurrence";
import Link from "next/link";

export const dynamic = "force-dynamic";

const getOccurrences = async (): Promise<Occurrence[]> => {
  try {
    const response = await http.get("/occurrences");
    return response.data;
  } catch (error) {
    console.error("Falha ao buscar ocorrências:", error);
    return [];
  }
};

const OccurrencePage = async () => {
  const occurrences = await getOccurrences();

  return (
    <div className="container max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <H1>Minhas Ocorrências</H1>
        <Link
          href="/occurrences/create"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Nova Ocorrência
        </Link>
      </div>

      {/* Renderiza a lista */}
      {occurrences.length === 0 ? (
        <p className="text-gray-600">Nenhuma ocorrência encontrada.</p>
      ) : (
        <div className="space-y-4">
          {occurrences.map((occ) => (
            <Modal
              key={occ.id}
              className="w-full"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{occ.title}</h2>
                <Chip status={occ.status} />
              </div>
              <p className="text-gray-600 mt-2">{occ.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400 mt-4">
                  Reportado por: {occ.reportedBy.name} em{" "}
                  {new Date(occ.createdAt).toLocaleDateString()}
                </div>
                <Link
                  href={`/occurrences/${occ.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Detalhes
                </Link>
              </div>
            </Modal>
          ))}
        </div>
      )}
    </div>
  );
};

export default OccurrencePage;
