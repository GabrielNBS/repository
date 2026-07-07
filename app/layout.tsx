import type { Metadata } from 'next';
import { Kaushan_Script } from 'next/font/google';
import './globals.css';
import TransitionProvider from '@/components/ui/TransitionProvider';

const kaushanScript = Kaushan_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-kaushan-script',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Gabriel NBS | Portfolio Front-end',
  description:
    'Portfolio de projetos front-end com foco em interfaces responsivas, claras e bem acabadas.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={kaushanScript.variable}>
      <body>
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
