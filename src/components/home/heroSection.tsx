import { IVideo } from "@/utils/api/types/screenTypes/mainScreen.interface";
import React, { useState } from "react";
import styles from "@/assets/styles/Home.module.scss";
import { useCursorHover } from "@/hooks/useCursorHover";
import { ButtonContact } from "../shared/buttonContact";
import { Modal } from "../shared/modal";

type props = {
	title: string;
	video: IVideo;
};

export const HeroSection = ({ title, video }: props) => {
	const hoverProps = useCursorHover(20);
	const [isOpen, setIsOpen] = useState(false);
	return (
		<section className={styles.heroSection}>
			<video muted autoPlay loop playsInline>
				<source src={process.env.NEXT_PUBLIC_URL + video.url} />
			</video>
			<div className={styles.heroSection__content + " container"}>
				<h1>{title}</h1>
				<ButtonContact
					onClick={() => {
						setIsOpen(true);
					}}
					hoverProps={hoverProps}
				/>
			</div>
			<Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				closeOnOutsideClick
			/>
		</section>
	);
};
