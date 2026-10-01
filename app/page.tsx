import PortfolioHome from '@/features/portfolio/shell/PortfolioHome';

type HomeProps = {
  searchParams: Promise<{ from?: string | string[] }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  return <PortfolioHome returnToProjects={params.from === 'project'} />;
}
