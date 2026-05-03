import React from 'react';
import { motion } from 'framer-motion';
import { SPRING_TRANSITION } from '@/constants/animations';
import { ShowcaseItem } from '@/types/showcase';

interface AppleFeatureDotNavProps {
	items: ShowcaseItem[];
	activeId: string;
	onSelect: (id: string) => void;
}

export const AppleFeatureDotNav: React.FC<AppleFeatureDotNavProps> = ({ items, activeId, onSelect }) => {
	return (
		<div className="hidden md:flex flex-col gap-4 z-20" role="tablist" aria-label="Navegação rápida Apple">
			{items.map((item) => (
				<button
					key={`dot-${item.id}`}
					onClick={() => onSelect(item.id)}
					className="group relative p-2 focus:outline-none"
					role="tab"
					aria-selected={activeId === item.id}
					aria-label={`Mostrar ${item.title}`}
					tabIndex={-1}
				>
					<div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
						activeId === item.id ? 'bg-white scale-150' : 'bg-white/20 group-hover:bg-white/40'
					}`} />
					{activeId === item.id && (
						<motion.div
							layoutId="active-dot-ring"
							className="absolute inset-0 border border-white/30 rounded-full"
							transition={SPRING_TRANSITION}
						/>
					)}
				</button>
			))}
		</div>
	);
};
