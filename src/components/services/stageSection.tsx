import { IStageSection } from "@/utils/api/types/screenTypes/servicesScreen.interface";
import React, { useRef } from "react";
import styles from "@/assets/styles/services.module.scss";
import Image from "next/image";

type Props = { data: IStageSection };

export const StageSection = ({ data }: Props) => {
	const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

	const handleScroll = () => {
		const windowHeight = window.innerHeight;

		imgRefs.current.forEach((imgRef, index) => {
			if (!imgRef) return;

			const rect = imgRef.getBoundingClientRect();

			let progress = Math.min(
				Math.max((windowHeight * 1.2 - rect.bottom) / (windowHeight * 0.2), 0),
				1
			);

			if (
				index === 0 ||
				imgRefs.current[index - 1]?.querySelector("img")?.clientWidth! >=
					imgRefs.current[index - 1]!.offsetWidth
			) {
				const img = imgRef.querySelector("img") as HTMLImageElement;
				if (img) {
					img.style.width = `${20 + progress * 80}%`;
				}
			}
		});
	};

	React.useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<section className={styles.stageSec}>
			<div className="container">
				<div className={styles.stageSec__header}>
					<h2 className="sectionTitle">как мы работаем</h2>
					<div className={"sectionContent h2"}>{data.Title}</div>
				</div>
				<div className={styles.stageSec__stagesWrapp}>
					{data.Stages.map((stage, index) => (
						<div className={styles.stageSec__stage} key={stage.Title}>
							<div
								className={styles.stageSec__stageImgWrapp}
								ref={(el) => {
									imgRefs.current[index] = el;
								}}
							>
								<Image
									src={process.env.NEXT_PUBLIC_URL + stage.Image.url}
									width={stage.Image.width}
									height={stage.Image.height}
									alt={stage.Image.alternativeText}
								/>
							</div>
							<div className={styles.stageSec__stageContent}>
								<h3 className="itemTitle">{stage.Title}</h3>
								<pre>{stage.Text}</pre>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
