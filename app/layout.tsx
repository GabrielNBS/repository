import type { Metadata } from 'next';
import './globals.css';
import { Lora } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Gabriel Nascimento — Front-end com intenção',
  description:
    'Portfolio de Gabriel Nascimento: interfaces front-end com direção visual, arquitetura e movimento.'
};

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap'
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={lora.variable}>
      <body>{children}</body>
    </html>
  );
}
