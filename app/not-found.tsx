import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found-page">
      <p className="section-kicker">404</p>
      <h1>Pagina nao encontrada.</h1>
      <p>O caminho acessado nao existe ou foi movido.</p>
      <Link href="/" className="button button-primary">
        Voltar
      </Link>
    </main>
  );
}
