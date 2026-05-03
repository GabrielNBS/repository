import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { SPRING_TRANSITION } from '@/constants/animations';
import { ShowcaseItem } from '@/types/showcase';

interface AppleFeatureAccordionItemProps {
	item: ShowcaseItem;
	isActive: boolean;
	onSelect: (id: string) => void;
}

export const AppleFeatureAccordionItem: React.FC<AppleFeatureAccordionItemProps> = ({
	item,
	isActive,
	onSelect,
}) => {
	const { id, title, description, content } = item;
	return (
		<motion.button
			layout
			onClick={() => onSelect(id)}
			role="tab"
			aria-selected={isActive}
			aria-controls={`panel-${id}`}
			id={`tab-${id}`}
			initial={false}
			transition={SPRING_TRANSITION}
			className={`relative overflow-hidden text-left block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 border border-transparent ${isActive
				? 'bg-black/40 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] w-full border-white/10'
				: 'bg-black/40 backdrop-blur-md p-3 px-5 rounded-full w-auto hover:bg-white/10'
				}`}
		>
			<motion.div layout="position" className="flex items-start gap-4">
				<div className="relative flex-shrink-0">
					<motion.div
						layout
						initial={false}
						animate={{ 
							opacity: isActive ? 0 : 1,
							scale: isActive ? 0.5 : 1,
							width: isActive ? 0 : '2rem', // Collapse width when active to allow more space for title
							marginRight: isActive ? 0 : '1rem'
						}}
						transition={SPRING_TRANSITION}
						className="flex items-center justify-center overflow-hidden"
					>
						<div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center">
							<Plus className="w-4 h-4 text-white" />
						</div>
					</motion.div>
				</div>

				<motion.div layout="position" className="flex-1 min-w-0">
					<motion.div layout="position" className="leading-relaxed">
						<motion.span
							layout
							className={`inline-block font-medium transition-all duration-300 ${isActive
								? 'text-white text-xl md:text-2xl font-bold mb-4'
								: 'text-[#86868b] text-base md:text-lg'
								}`}
						>
							{title}
						</motion.span>
						
						<AnimatePresence mode="wait">
							{isActive && (
								<motion.div
									layout
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: 'auto' }}
									exit={{ opacity: 0, height: 0 }}
									transition={SPRING_TRANSITION}
									className="text-white/80 overflow-hidden"
								>
									{description && (
										<p className="text-base md:text-lg font-medium mb-6">
											{description}
										</p>
									)}
									<div className="w-full">
										{content}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				</motion.div>
			</motion.div>
		</motion.button>
	);
};
