import React, { useEffect, useRef, useState } from "react";
import { INotDoingSection } from "@/utils/api/types/screenTypes/IServicesScreen";
import styles from "@/assets/css/services.module.scss";

type Props = { data: INotDoingSection };

export const NotDoingSection = ({ data }: Props) => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const placeholderRef = useRef<HTMLDivElement>(null);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [pin, setPin] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (!sectionRef.current || !placeholderRef.current) return;

			const section = sectionRef.current;
			const placeholder = placeholderRef.current;

			const sectionFits = section.offsetHeight <= window.innerHeight;
			setPin(sectionFits);

			const scrollY = window.scrollY || window.pageYOffset;
			const placeholderTop = placeholder.offsetTop;

			const rect = section.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			setIsDarkMode(rect.top <= windowHeight * 0.7 && rect.bottom >= 0);

			if (sectionFits) {
				const offset = Math.max(0, scrollY - placeholderTop);
				section.style.transform = `translateY(${offset}px)`;
			} else {
				section.style.transform = "none";
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleScroll);

		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, []);

	return (
		<div ref={placeholderRef} style={{ position: "relative", width: "100%" }}>
			<section
				ref={sectionRef}
				className={`${styles.notDoingSec} ${isDarkMode ? styles.darkMode : ""}`}
				style={{
					transition: "transform 0.05s linear",
					willChange: "transform",
				}}
			>
				<div className={styles.overlay} />
				<div className={styles.container + " container"}>
					<div className={styles.notDoingSec__header}>
						<h2 className="sectionTitle">не делаем</h2>
						<div className="sectionContent h2">
							{data ? data.title : "услуги которые не делаем"}
						</div>
					</div>
					<div className={styles.notDoingSec__accordions}>
						{data
							? data.accordions.map((accordion, index) => (
									<div
										key={accordion.id}
										className={`${styles.dropDown} ${
											index === data.accordions.length - 1
												? styles.notBorder
												: ""
										} ${index !== 0 ? styles.paddingTop : ""}`}
									>
										<div className={styles.dropDown__header}>
											<h3 className="itemTitle">{accordion.value}</h3>
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
