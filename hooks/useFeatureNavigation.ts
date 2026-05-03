import { useState, useCallback } from 'react';

interface NavItem {
	id: string | number;
}

export const useFeatureNavigation = <T extends NavItem>(items: T[]) => {
	const [activeId, setActiveId] = useState<string>(String(items[0].id));

	const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
		const currentIndex = items.findIndex(item => String(item.id) === activeId);
		
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			const nextIndex = (currentIndex + 1) % items.length;
			setActiveId(String(items[nextIndex].id));
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			const prevIndex = (currentIndex - 1 + items.length) % items.length;
			setActiveId(String(items[prevIndex].id));
		}
	}, [activeId, items]);

	return {
		activeId,
		setActiveId,
		handleKeyDown,
	};
};
