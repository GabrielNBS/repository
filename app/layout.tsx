import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gabriel Nascimento — Front-end com intenção',
  description:
    'Portfolio de Gabriel Nascimento: interfaces front-end com direção visual, arquitetura e movimento.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
