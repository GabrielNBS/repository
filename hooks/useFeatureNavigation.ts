import { useState, useCallback } from 'react';
import { Project } from '@/data/projects';

export const useFeatureNavigation = (projects: Project[]) => {
	const [activeId, setActiveId] = useState<string>(String(projects[0].id));

	const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
		const currentIndex = projects.findIndex(p => String(p.id) === activeId);
		
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			const nextIndex = (currentIndex + 1) % projects.length;
			setActiveId(String(projects[nextIndex].id));
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
			setActiveId(String(projects[prevIndex].id));
		}
	}, [activeId, projects]);

	return {
		activeId,
		setActiveId,
		handleKeyDown,
	};
};
