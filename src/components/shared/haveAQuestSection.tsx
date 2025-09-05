import React, { useState } from "react";
import { ButtonContact } from "./buttonContact";
import styles from "@/assets/styles/shared/haveAQuestSection.module.scss";
import { useCursorHover } from "@/hooks/useCursorHover";
import { Modal } from "./modal";
export const HaveAQuestSection = () => {
	const hoverProps = useCursorHover(20);
	const [isOpen, setIsOpen] = useState(false);
	return (
		<section className={styles.buttonWrappSection}>
			<h2>Есть вопросы по вашему проекту?</h2>
			<ButtonContact
				black
				hoverProps={hoverProps}
				onClick={() => {
					setIsOpen(true);
				}}
			/>
			<Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				closeOnOutsideClick
			/>
		</section>
	);
};
