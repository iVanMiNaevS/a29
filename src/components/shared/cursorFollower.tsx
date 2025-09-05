import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store/useStore";
import styles from "@/assets/styles/shared/cursorFollower.module.scss";

const CursorFollower = observer(() => {
	const containerRef = useRef<HTMLDivElement>(null);
	const circleRef = useRef<HTMLDivElement>(null);
	const { cursorStore } = useStore();

	const [visible, setVisible] = useState(false);
	const started = useRef(false);
	const position = useRef({ x: 0, y: 0 });
	const target = useRef({ x: 0, y: 0 });
	const rafId = useRef<number>(null);

	useEffect(() => {
		const container = containerRef.current;
		const circle = circleRef.current;
		if (!container || !circle) return;

		const handleMouseMove = (e: MouseEvent) => {
			if (!started.current) {
				started.current = true;

				position.current = { x: e.clientX, y: e.clientY };
				target.current = { x: e.clientX, y: e.clientY };

				container.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

				setVisible(true);
			} else {
				target.current = { x: e.clientX, y: e.clientY };
			}
		};

		const animate = () => {
			if (started.current) {
				position.current.x += (target.current.x - position.current.x) * 0.2;
				position.current.y += (target.current.y - position.current.y) * 0.2;

				container.style.transform = `translate(${Math.round(
					position.current.x
				)}px, ${Math.round(position.current.y)}px)`;
				circle.style.marginLeft = `-${cursorStore.currentSize / 2}px`;
				circle.style.marginTop = `-${cursorStore.currentSize / 2}px`;
			}
			rafId.current = requestAnimationFrame(animate);
		};

		rafId.current = requestAnimationFrame(animate);
		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			if (rafId.current) cancelAnimationFrame(rafId.current);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [cursorStore.currentSize]);

	return (
		<div
			ref={containerRef}
			className={styles.container}
			style={{
				opacity: visible ? 1 : 0,
				transition: "opacity 0.2s ease-out",
			}}
		>
			<div
				ref={circleRef}
				className={styles.circle}
				style={{
					width: cursorStore.currentSize,
					height: cursorStore.currentSize,
				}}
			>
				{cursorStore.showText && (
					<span className={styles.text}>{cursorStore.text}</span>
				)}
			</div>
		</div>
	);
});

export default CursorFollower;
