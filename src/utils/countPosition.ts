export interface PositionStyle {
	top: string;
	left: string;
	position: "absolute";
	width: string;
	height: string;
}

export const countPosition = (pos: number): PositionStyle => {
	const gap = 20; // везде 20px

	const containerWidth = 826;
	const containerHeight = 744;

	const cellWidth = (containerWidth - gap * 3) / 4; // (826 - 60) / 4 = 191.5px
	const cellHeight = (containerHeight - gap * 2) / 3; // (744 - 40) / 3 = 234.666px

	const row = Math.floor((pos - 1) / 4);
	const col = (pos - 1) % 4;

	return {
		top: `${row * (cellHeight + gap)}px`,
		left: `${col * (cellWidth + gap)}px`,
		position: "absolute",
		width: `${cellWidth}px`,
		height: `${cellHeight}px`,
	};
};
