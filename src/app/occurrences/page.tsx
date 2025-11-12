import H1 from "@/components/H1";
import Chip from "@/components/occurrences/Chip";
import { api } from "@/lib/axios";
import { Occurrence } from "@/types/occurrence";
import { cookies } from "next/headers";
import Link from "next/link";

const getOccurrences = async (): Promise<Occurrence[]> => {
  const token = (await cookies()).get("token")?.value;
  if (!token) return [];

  try {
    const response = await api.get("/occurrences", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
            <div
              key={occ.id}
              className="bg-white dark:bg-black p-4 rounded-lg shadow border border-gray-200 dark:border-gray-800"
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OccurrencePage;
