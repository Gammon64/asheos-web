import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/occurrences"];
const publicRoutes = ["/login", "/register", "/"];

export default async function proxy(req: NextRequest) {
  //   Confere se a rota atual é protegida ou pública
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  //    Confere se há usuário logado
  const cookie = (await cookies()).get("token")?.value;

  //   Redireciona o usuário se não estiver autenticado
  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  //   Redireciona o usuário se estiver autenticado
  if (
    isPublicRoute &&
    cookie &&
    !req.nextUrl.pathname.startsWith("/occurrences")
  ) {
    return NextResponse.redirect(new URL("/occurrences", req.nextUrl));
  }

  return NextResponse.next();
}

// Rotas para ignorar
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
