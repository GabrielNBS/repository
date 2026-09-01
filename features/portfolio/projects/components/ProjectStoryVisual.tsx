import type { Project } from '@/features/portfolio/projects/data/projects';
import styles from '../styles/ProjectsSection.module.css';

export default function ProjectStoryVisual({ project }: { project: Project }) {
  return (
    <div className={styles.storyVisual} aria-hidden="true">
      <span className={styles.storyVisualGrid} />
      <span className={styles.storyVisualCircle} />
      <span className={styles.storyVisualOrb} />
      <div className={styles.storyVisualMeta}>
        <span>0{project.id}</span>
        <span>{project.year}</span>
      </div>
      <span className={styles.storyVisualName}>{project.name}</span>
      <div className={styles.storyVisualMeta}>
        <span>Interface / estudo</span>
        <span>↗</span>
      </div>
    </div>
  );
}
