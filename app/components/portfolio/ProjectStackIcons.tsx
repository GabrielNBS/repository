import type { Project } from '../../../data/projects';
import { getStackIcon } from './projectStackIconLogic';

type ProjectStackIconsProps = { stacks: Project['techs'] };

export default function ProjectStackIcons({ stacks }: ProjectStackIconsProps) {
  return (
    <div className="flex items-center pl-2" aria-hidden="true">
      {stacks.map((stack, index) => {
        const icon = getStackIcon(stack.name);
        const StackIcon = icon.Icon;

        return (
          <span
            className={`group/stack relative grid size-9 shrink-0 place-items-center rounded-full border border-paper/80 bg-paper/85 shadow-[0_0.3rem_rgb(37_34_31_/_0.12)] transition duration-300 hover:z-10 group-hover:-translate-y-1 ${icon.tone} ${index ? '-ml-2.5' : ''}`}
            key={stack.name}
            style={{ transitionDelay: `${index * 24}ms` }}
          >
            <StackIcon aria-hidden="true" className="size-[1.05rem]" />
            <span className="pointer-events-none absolute bottom-[calc(100%+0.65rem)] left-1/2 z-20 w-max max-w-36 -translate-x-1/2 translate-y-1 rounded-full bg-ink px-2.5 py-1.5 text-center text-utility-2xs font-semibold tracking-[0.08em] text-paper opacity-0 shadow-[0_0.45rem_1rem_rgb(37_34_31_/_0.18)] transition duration-200 group-hover/stack:translate-y-0 group-hover/stack:opacity-100">
              {stack.name}
            </span>
          </span>
        );
      })}
    </div>
  );
}
