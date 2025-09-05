import Image from "next/image";
import React, {
	FC,
	PropsWithChildren,
	useEffect,
	useRef,
	useState,
} from "react";

import styles from "@/assets/styles/shared/dropDownInfo.module.scss";
import { useCursorHover } from "@/hooks/useCursorHover";

type props = {
	title: string;
	notBorder?: boolean;
	paddingTop?: boolean;
};

export const DropDownInfo: FC<PropsWithChildren & props> = ({
	children,
	title,
	notBorder,
	paddingTop,
}) => {
	const [openBody, setOpenBody] = useState(false);
	const bodyRef = useRef<HTMLDivElement>(null);
	const [contentHeight, setContentHeight] = useState(0);
	const hoverProps = useCursorHover(20);
	useEffect(() => {
		if (bodyRef.current) {
			setContentHeight(bodyRef.current.scrollHeight);
		}
	}, [children]);

	return (
		<div
			className={
				styles.dropDown +
				` ${notBorder ? styles.notBorder : ""}` +
				` ${paddingTop ? styles.paddingTop : ""}`
			}
			onClick={() => setOpenBody((prev) => !prev)}
			{...hoverProps}
		>
			<div className={styles.dropDown__header}>
				<h3 className="itemTitle">{title}</h3>
				<button>
					<svg
						className={openBody ? styles.isActive : ""}
						width="20"
						height="21"
						viewBox="0 0 20 21"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M14.7413 9.87579H3.125C2.95924 9.87579 2.80027 9.94164 2.68306 10.0588C2.56585 10.1761 2.5 10.335 2.5 10.5008C2.5 10.6665 2.56585 10.8255 2.68306 10.9427C2.80027 11.0599 2.95924 11.1258 3.125 11.1258H14.7413L10.1825 15.6833C10.0651 15.8006 9.99921 15.9598 9.99921 16.1258C9.99921 16.2918 10.0651 16.4509 10.1825 16.5683C10.2999 16.6856 10.459 16.7516 10.625 16.7516C10.791 16.7516 10.9501 16.6856 11.0675 16.5683L16.6925 10.9433C16.7507 10.8852 16.7969 10.8163 16.8284 10.7403C16.8599 10.6644 16.8761 10.583 16.8761 10.5008C16.8761 10.4186 16.8599 10.3372 16.8284 10.2612C16.7969 10.1853 16.7507 10.1163 16.6925 10.0583L11.0675 4.43329C10.9501 4.31593 10.791 4.25 10.625 4.25C10.459 4.25 10.2999 4.31593 10.1825 4.43329C10.0651 4.55065 9.99921 4.70982 9.99921 4.87579C9.99921 5.04176 10.0651 5.20093 10.1825 5.31829L14.7413 9.87579Z"
							fill="#8E9194"
						></path>
					</svg>
				</button>
			</div>
			<div
				ref={bodyRef}
				className={styles.dropDown__body}
				style={{
					maxHeight: openBody ? `calc(${contentHeight}px + 25px)` : "0px",
					paddingTop: openBody ? "20px" : "",
					transition: "all 0.3s ease",
					overflow: "hidden",
				}}
			>
				{children}
			</div>
		</div>
	);
};
