import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
      <p className="text-accent text-label font-label mb-4 tracking-[0.1em] uppercase">404</p>
      <h1 className="text-display font-heading max-w-[10ch] tracking-normal">
        Pagina nao encontrada.
      </h1>
      <p className="text-muted text-body">O caminho acessado nao existe ou foi movido.</p>
      <ButtonLink
        href="/"
        variant="filled"
        intent="primary"
      >
        Voltar
      </ButtonLink>
    </main>
  );
}

