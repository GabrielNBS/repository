import type { Metadata } from 'next';
import './globals.css';
import ProjectPageTransition from '@/features/portfolio/shared/motion/ProjectPageTransition';
import VideoMotionControl from '@/features/portfolio/shared/VideoMotionControl';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Gabriel Nascimento — Front-end com intenção',
  description:
    'Portfólio de Gabriel Nascimento: interfaces front-end com direção visual, arquitetura e movimento.',
  applicationName: 'Gabriel Nascimento — Portfólio',
  authors: [{ name: 'Gabriel Nascimento' }],
  creator: 'Gabriel Nascimento',
  keywords: [
    'Gabriel Nascimento',
    'desenvolvedor front-end',
    'portfolio front-end',
    'React',
    'Next.js',
    'interfaces digitais'
  ],
  alternates: {
    canonical: '/'
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    title: 'Gabriel Nascimento — Front-end com intenção',
    description: 'Interfaces front-end com direção visual, arquitetura e movimento.'
  },
  twitter: {
    card: 'summary',
    title: 'Gabriel Nascimento — Front-end com intenção',
    description: 'Interfaces front-end com direção visual, arquitetura e movimento.'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <VideoMotionControl />
        <ProjectPageTransition />
      </body>
    </html>
  );
}
