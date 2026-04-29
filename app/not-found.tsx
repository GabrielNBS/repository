import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-[clamp(3rem,6vw,5rem)] font-black text-accent">
        404
      </h1>
      <p className="text-[clamp(1rem,2.5vw,1.125rem)]">
        Página não encontrada.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-accent px-6 py-3 font-bold text-tertiary transition-transform hover:scale-105"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
