import type { MetadataRoute } from 'next';
import projects from '@/features/portfolio/projects/data/projects';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: 'monthly',
      priority: 1
    }
  ];

  return [
    ...routes,
    ...projects.map((project) => ({
      url: `${siteUrl}/projetos/${project.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.7
    }))
  ];
}
