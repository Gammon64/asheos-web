import Welcome from "@/components/dashboard/Welcome";
import H1 from "@/components/H1";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={100}
        height={20}
        priority
      />
      <Welcome />
      <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
        <H1 className="max-w-xs leading-10 tracking-tight">
          Veja as ocorrências registradas
        </H1>
        <Link
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
          href="/login"
        >
          Entrar
        </Link>
      </div>
      <div className="flex flex-col gap-4 text-base font-medium">
        <p className="text-gray-700 dark:text-zinc-300">Ainda não é registrado?</p>
        <Link
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
          href="/register"
        >
          Registre-se
        </Link>
      </div>
    </main>
  );
}
