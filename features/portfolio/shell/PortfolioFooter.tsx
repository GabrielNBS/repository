import Link from 'next/link';

export default function PortfolioFooter() {
  return (
    <footer className="bg-paper text-muted relative z-10 flex items-center justify-between gap-4 px-[clamp(1.25rem,3vw,3.75rem)] pt-6 pb-10 text-label font-bold tracking-[0.08em] uppercase max-[480px]:flex-col max-[480px]:items-start [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center">
      <span>Gabriel Nascimento © 2026</span>
      <Link href="#hero-title">Voltar ao topo ↑</Link>
    </footer>
  );
}
