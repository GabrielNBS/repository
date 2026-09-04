export type ProjectTone = 'peach' | 'lilac' | 'cream' | 'rose';

const projectTones: ProjectTone[] = ['peach', 'lilac', 'cream', 'rose'];

export function getProjectTone(projectId: number): ProjectTone {
  return projectTones[(projectId - 1) % projectTones.length];
}
