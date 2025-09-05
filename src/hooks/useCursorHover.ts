// hooks/useCursorHover.ts
import { useStore } from "../store/useStore";

export const useCursorHover = (
	hoverSize?: number,
	showText: boolean = false,
	text: string = "Смотреть"
) => {
	const { cursorStore } = useStore();

	const handleMouseEnter = () => {
		if (hoverSize) {
			cursorStore.setCustomHover(hoverSize);
		}
		cursorStore.enterHover(showText, text);
	};

	const handleMouseLeave = () => {
		cursorStore.leaveHover();
		if (hoverSize) {
			cursorStore.resetHover();
		}
	};

	return {
		onMouseEnter: handleMouseEnter,
		onMouseLeave: handleMouseLeave,
	};
};
