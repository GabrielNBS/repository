import TransitionLink from '@/components/ui/TransitionLink';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
      <p className="text-accent text-label font-label mb-4 tracking-[0.1em] uppercase">404</p>
      <h1 className="text-display font-heading max-w-[10ch] tracking-normal">
        Pagina nao encontrada.
      </h1>
      <p className="text-muted text-body">O caminho acessado nao existe ou foi movido.</p>
      <TransitionLink
        href="/"
        className="bg-ink text-paper hover:bg-accent-dark min-h-touch gap-action-gap px-button-x py-button-y text-ui font-ui inline-flex items-center justify-center rounded-sm border border-transparent transition-all duration-180 hover:-translate-y-0.5 max-sm:w-full"
      >
        Voltar
      </TransitionLink>
    </main>
  );
}

