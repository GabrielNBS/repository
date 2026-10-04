import type { Project } from './projects';

const featuredOrder = ['whatsapp-sender', 'regula', 'e-play', 'to-do'];

export function getOrderedProjects(items: Project[]) {
  const rank = (slug: string) => {
    const index = featuredOrder.indexOf(slug);
    return index < 0 ? featuredOrder.length : index;
  };
  return [...items].sort((a, b) => rank(a.slug) - rank(b.slug));
}
