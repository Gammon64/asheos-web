"use client";

import { logout } from "@/actions/auth";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-black shadow-md p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          asheos
        </Link>
        <div>
          {user ? (
            // Usuário está LOGADO
            <div className="flex items-center gap-4">
              <span>Olá, {user.name}</span>
              <Link
                href="/occurrences"
                className="text-gray-600 hover:text-black"
              >
                Ocorrências
              </Link>

              {/* O Logout é um formulário que chama a action logout */}
              <form action={logout}>
                <button type="submit" className="text-red-500 hover:underline">
                  Sair
                </button>
              </form>
            </div>
          ) : (
            // Usuário está DESLOGADO
            <div className="flex gap-4">
              <Link href="/login" className="text-gray-600 hover:text-black">
                Login
              </Link>
              <Link href="/register" className="text-gray-600 hover:text-black">
                Registrar
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
