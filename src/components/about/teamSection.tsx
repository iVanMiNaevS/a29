import {
	IAboutPageData,
	ITeamMember,
} from "@/utils/api/types/screenTypes/aboutScreen.interface";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/assets/styles/about.module.scss";
import { useCursorHover } from "@/hooks/useCursorHover";
import Image from "next/image";
import { IImageFormat } from "@/utils/api/types/image.interface";
import { countPosition } from "@/utils/countPosition";
type props = {
	data: IAboutPageData;
};

export const TeamSection = ({ data }: props) => {
	const hoverProps = useCursorHover(20);
	const [mainMember, setMainMember] = useState<ITeamMember>(
		data.TeamSection.Team[0]
	);
	const [layout, setLayout] = useState<"default" | "alternative">("default");
	const [buttons, setButtons] = useState([
		{
			id: 1,
			content: (
				<svg
					width="83"
					height="34"
					viewBox="0 0 83 34"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M0 0H25V34H0V0Z"></path>
					<rect x="49" width="7" height="10"></rect>
					<rect x="49" y="12" width="7" height="10"></rect>
					<rect x="76" width="7" height="10"></rect>
					<rect x="76" y="24" width="7" height="10"></rect>
					<rect x="67" width="7" height="10"></rect>
					<rect x="67" y="12" width="7" height="10"></rect>
					<rect x="58" y="12" width="7" height="10"></rect>
					<rect x="58" y="24" width="7" height="10"></rect>
				</svg>
			),
			active: true,
		},
		{
			id: 2,
			content: (
				<svg
					width="83"
					height="34"
					viewBox="0 0 83 34"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M29 0H54V34H29V0Z"></path>
					<path d="M58 0H65V10H58V0Z"></path>
					<path d="M0 12H7V22H0V12Z"></path>
					<path d="M76 0H83V10H76V0Z"></path>
					<path d="M9 0H16V10H9V0Z"></path>
					<path d="M67 12H74V22H67V12Z"></path>
					<path d="M9 12H16V22H9V12Z"></path>
					<path d="M18 24H25V34H18V24Z"></path>
					<path d="M58 24H65V34H58V24Z"></path>
				</svg>
			),
			active: false,
		},
	]);
	const [containerHeight, setContainerHeight] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const calculateHeight = () => {
			if (containerRef.current) {
				const width = containerRef.current.offsetWidth;
				const height = width * 0.9;
				setContainerHeight(height);
			}
		};

		calculateHeight();

		const handleResize = () => calculateHeight();
		window.addEventListener("resize", handleResize);

		const interval = setInterval(calculateHeight, 100);

		return () => {
			window.removeEventListener("resize", handleResize);
			clearInterval(interval);
		};
	}, []);
	return (
		<section className={styles.teamSec}>
			<div className={styles.teamSec__header}>
				<div className={styles.teamSec__headerLeft}>
					<h2 className="sectionTitle">Команда</h2>
					<div className={styles.teamSec__headerBtnsWrapp}>
						{buttons.map((btn) => {
							return (
								<button
									key={btn.id}
									onClick={() => {
										setLayout(() => (btn.id === 1 ? "default" : "alternative"));
										setButtons((prev) => {
											return prev.map((bt) => {
												return { ...bt, active: bt.id === btn.id };
											});
										});
									}}
									{...hoverProps}
									className={btn.active ? styles.active : ""}
								>
									{btn.content}
								</button>
							);
						})}
					</div>
				</div>
				<p className="sectionContent h3">{data.TeamSection.Title}</p>
			</div>
			<div className={`${styles.teamSec__teamWrapp} ${styles[layout]}`}>
				<div
					className={
						styles.teamSec__mainCard +
						` ${layout === "alternative" ? styles.alternative : ""}`
					}
					style={{ gridArea: "main" }}
				>
					{mainMember && (
						<>
							<Image
								src={process.env.NEXT_PUBLIC_URL + mainMember.Image.url}
								alt={mainMember.Image.alternativeText}
								width={mainMember.Image.width}
								height={mainMember.Image.height}
							/>
							<p className="itemTitle">{mainMember.Name}</p>
							<p className={styles.teamSec__mainCardPost}>{mainMember.Post}</p>
						</>
					)}
				</div>
				<div
					ref={containerRef}
					style={{
						height: containerHeight > 0 ? `${containerHeight}px` : "600px",
					}}
					className={
						styles.teamSec__otherTeam +
						` ${layout === "alternative" ? styles.alternative : ""}`
					}
				>
					{data.TeamSection.Team.map((member, index) => {
						const pos =
							layout !== "alternative"
								? member.DefaultPosition
								: member.AlternativePosition;

						return (
							<div
								key={member.id}
								className={styles.teamSec__card}
								style={countPosition(pos)}
								onClick={() => {
									setMainMember(member);
								}}
								{...hoverProps}
							>
								<Image
									src={process.env.NEXT_PUBLIC_URL + member.Image.url}
									alt={member.Name}
									width={member.Image.width}
									height={member.Image.height}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};
