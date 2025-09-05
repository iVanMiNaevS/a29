import React from "react";
import styles from "@/assets/styles/shared/buttonContact.module.scss";
type props = {
	onClick: () => void;
	hoverProps: {
		onMouseEnter: () => void;
		onMouseLeave: () => void;
	};
	black?: boolean;
};

export const ButtonContact = ({ black, onClick, hoverProps }: props) => {
	return (
		<div className={styles.btnWrapp + ` ${black ? styles.black : ""}`}>
			<button {...hoverProps} onClick={onClick}>
				+
			</button>
			<p>Нажмите, чтобы связаться</p>
		</div>
	);
};
