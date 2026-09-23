import type { Project } from '@/features/portfolio/projects/data/projects';
import { getStackIcon } from './data/projectStackIconLogic';
import styles from './ProjectStackIcons.module.css';

type ProjectStackIconsProps = { stacks: Project['techs'] };

export default function ProjectStackIcons({ stacks }: ProjectStackIconsProps) {
  return (
    <div className={styles.stack} aria-hidden="true">
      {stacks.map((stack, index) => {
        const icon = getStackIcon(stack.name);
        const StackIcon = icon.Icon;

        return (
          <span
            className={`${styles.icon} ${index ? styles.overlap : ''}`}
            key={stack.name}
            style={{ color: icon.color, transitionDelay: `${index * 24}ms` }}
          >
            <StackIcon aria-hidden="true" className={styles.svg} />
            <span className={styles.tooltip}>
              {stack.name}
            </span>
          </span>
        );
      })}
    </div>
  );
}
