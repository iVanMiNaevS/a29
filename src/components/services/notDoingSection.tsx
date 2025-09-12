import React, { useEffect, useRef, useState } from "react";
import { INotDoingSection } from "@/utils/api/types/screenTypes/servicesScreen.interface";
import styles from "@/assets/styles/services.module.scss";

type Props = { data: INotDoingSection };

export const NotDoingSection = ({ data }: Props) => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const placeholderRef = useRef<HTMLDivElement>(null);
	const [scrollOffset, setScrollOffset] = useState(0);
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (!sectionRef.current || !placeholderRef.current) return;

			const scrollY = window.scrollY || window.pageYOffset;
			const placeholder = placeholderRef.current;
			const section = sectionRef.current;

			const placeholderTop = placeholder.offsetTop;
			const placeholderHeight = placeholder.offsetHeight;

			const rawOffset = scrollY - placeholderTop;
			const offset = Math.max(
				0,
				Math.min(Math.floor(rawOffset), placeholderHeight - 1)
			);
			setScrollOffset(offset);

			const rect = section.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			setIsDarkMode(rect.top <= windowHeight * 0.7 && rect.bottom >= 0);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div
			ref={placeholderRef}
			style={{
				position: "relative",
				width: "100%",
			}}
		>
			<section
				ref={sectionRef}
				className={`${styles.notDoingSec} ${isDarkMode ? styles.darkMode : ""}`}
				style={{
					transform: `translateY(${scrollOffset}px)`,
					transition: "transform 0.05s linear",
				}}
			>
				<div className={styles.overlay} />
				<div className={styles.container + " container"}>
					<div className={styles.notDoingSec__header}>
						<h2 className="sectionTitle">не делаем</h2>
						<div className="sectionContent h2">
							{data ? data.Title : "услуги которые не делаем"}
						</div>
					</div>
					<div className={styles.notDoingSec__accordions}>
						{data
							? data.Accordions.map((accordion, index) => (
									<div
										key={accordion.id}
										className={`${styles.dropDown} ${
											index === data.Accordions.length - 1
												? styles.notBorder
												: ""
										} ${index !== 0 ? styles.paddingTop : ""}`}
									>
										<div className={styles.dropDown__header}>
											<h3 className="itemTitle">{accordion.Value}</h3>
										</div>
									</div>
							  ))
							: "список услуг которые не делаем"}
					</div>
				</div>
			</section>
		</div>
	);
};
