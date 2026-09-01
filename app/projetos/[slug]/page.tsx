import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import projects, { getProjectBySlug } from '@/features/portfolio/projects/data/projects';
import ProjectDetail from '@/features/portfolio/project-detail/ProjectDetail';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return { title: `${project.name} — Gabriel Nascimento`, description: project.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
