import React, { useMemo } from 'react';
import { Project } from '@/data/projects';
import { AppleFeatureBackground } from './AppleFeatureBackground';
import { AppleFeatureDotNav } from './AppleFeatureDotNav';
import { AppleFeatureAccordion } from './AppleFeatureAccordion';
import { useFeatureNavigation } from '@/hooks/useFeatureNavigation';
import { ShowcaseItem } from '@/types/showcase';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from "react-icons/fa6";

interface AppleFeatureShowcaseProps {
	project: Project;
}

export const AppleFeatureShowcase: React.FC<AppleFeatureShowcaseProps> = ({ project }) => {
	const items: ShowcaseItem[] = useMemo(() => [
		{
			id: 'description',
			title: 'Visão Geral',
			description: 'Sobre o projeto',
			content: (
				<p className="text-white/60 leading-relaxed text-lg">
					{project.description}
				</p>
			)
		},
		{
			id: 'techs',
			title: 'Tecnologias',
			description: 'Stack utilizada',
			content: (
				<div className="flex flex-wrap gap-2 mt-2">
					{project.techs.map((tech) => (
						<span
							key={tech.name}
							className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium text-white/80 border border-white/5"
						>
							{tech.name}
						</span>
					))}
				</div>
			)
		},
		{
			id: 'links',
			title: 'Links',
			description: 'Acesse o projeto',
			content: (
				<div className="flex flex-col sm:flex-row gap-4 mt-2">
					<a
						href={project.deploy}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-colors"
					>
						<ExternalLink className="w-4 h-4" />
						Visualizar Deploy
					</a>
					<a
						href={project.github}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 transition-colors border border-white/10"
					>
						<FaGithub className="w-4 h-4" />
						Código Fonte
					</a>
				</div>
			)
		}
	], [project]);

	const { activeId, setActiveId, handleKeyDown } = useFeatureNavigation(items);

	const activeImage = useMemo(() => {
		switch (activeId) {
			case 'description': return project.mockups.desktop;
			case 'techs': return project.mockups.tablet;
			case 'links': return project.mockups.mobile;
			default: return project.mockups.desktop;
		}
	}, [activeId, project.mockups]);

	return (
		<div
			className="relative w-full min-h-[700px] bg-[#000] text-white rounded-[2.5rem] overflow-hidden focus:outline-none"
			onKeyDown={handleKeyDown}
			tabIndex={0}
			role="region"
			aria-label={`Galeria do projeto ${project.name}`}
		>
			<AppleFeatureBackground activeId={activeId} imageSrc={activeImage} />

			<div className="relative z-10 h-full max-w-7xl mx-auto p-8 md:p-16 flex items-center min-h-[700px] gap-4 md:gap-12">
				<AppleFeatureDotNav 
					items={items} 
					activeId={activeId} 
					onSelect={setActiveId} 
				/>
				
				<AppleFeatureAccordion 
					project={project}
					items={items} 
					activeId={activeId} 
					onSelect={setActiveId} 
				/>
			</div>
		</div>
	);
};
