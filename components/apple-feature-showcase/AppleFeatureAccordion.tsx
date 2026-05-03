import React from 'react';
import { Project } from '../../data/projects';
import { AppleFeatureAccordionItem } from './AppleFeatureAccordionItem';
import { ShowcaseItem } from '@/types/showcase';

interface AppleFeatureAccordionProps {
	project: Project;
	items: ShowcaseItem[];
	activeId: string;
	onSelect: (id: string) => void;
}

export const AppleFeatureAccordion: React.FC<AppleFeatureAccordionProps> = ({
	project,
	items,
	activeId,
	onSelect,
}) => {
	return (
		<div className="max-w-xl w-full space-y-6 mt-12 md:mt-0">
			<h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tight text-white leading-tight">
				{project.name}
			</h2>
			
			<div className="space-y-4" role="tablist" aria-orientation="vertical">
				{items.map((item) => (
					<AppleFeatureAccordionItem
						key={item.id}
						item={item}
						isActive={activeId === item.id}
						onSelect={onSelect}
					/>
				))}
			</div>
		</div>
	);
};
