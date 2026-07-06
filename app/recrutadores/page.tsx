import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import RecruitersLanding from '@/components/sections/RecruitersLanding';
import ScrollTop from '@/components/ui/ScrollTop';

export const metadata: Metadata = {
  title: 'Para Recrutadores | Gabriel NBS',
  description:
    'Resumo objetivo para recrutadores: trajetoria, stack, disponibilidade e diferenciais de Gabriel NBS.'
};

export default function RecruitersPage() {
  return (
    <main id="top" className="min-h-screen overflow-x-clip lg:h-screen lg:overflow-hidden">
      <Header />
      <RecruitersLanding />
      <ScrollTop />
    </main>
  );
}
