import type { Metadata } from 'next';
import './globals.css';
import TransitionProvider from '@/components/ui/TransitionProvider';

export const metadata: Metadata = {
  title: 'Gabriel NBS | Portfolio Front-end',
  description: 'Portfolio de projetos front-end com foco em interfaces responsivas, claras e bem acabadas.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}

