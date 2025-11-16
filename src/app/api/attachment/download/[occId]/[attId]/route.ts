import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface Params {
  occId: string;
  attId: string;
}

// Rota: GET /api/download/[occId]/[attId]
export async function GET(request: NextRequest, params: Promise<Params>) {
  const { occId, attId } = await params;

  // Pegar o token do cookie
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    // Chama o backend (asheos-api)
    const response = await api.get(
      `/occurrences/${occId}/attachments/${attId}/download`,
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "arraybuffer", // Diz ao Axios para buscar os bytes
      }
    );

    // Pega os headers de arquivo
    // Assumimos que o backend envia Content-Type e Content-Disposition
    const contentType =
      response.headers["content-type"] || "application/octet-stream";
    const contentDisposition = response.headers["content-disposition"];

    // Cria a resposta de streaming para o browser
    const headers = new Headers();
    headers.set("Content-Type", contentType);
    if (contentDisposition) {
      headers.set("Content-Disposition", contentDisposition); // Ex: "attachment; filename="anexo.pdf""
    }

    return new NextResponse(response.data, {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error("Erro ao baixar arquivo:", error);
    if (error instanceof AxiosError && error.response) {
      return NextResponse.json(
        { error: "Erro no backend" },
        { status: error.response.status }
      );
    }
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
