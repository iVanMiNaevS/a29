import {
	IAboutPageData,
	ITeamMember,
} from "@/utils/api/types/screenTypes/IAboutScreen";
import React, { useState } from "react";
import styles from "@/assets/css/about.module.scss";
import { useCursorHover } from "@/hooks/useCursorHover";
import Image from "next/image";
import { IImageFormat } from "@/utils/api/types/IImage";
import { TeamSwiper } from "./teamSwiper";
type props = {
	data: IAboutPageData;
};

export const TeamSection = ({ data }: props) => {
	const hoverProps = useCursorHover(20);
	const [mainMember, setMainMember] = useState<ITeamMember>(
		data.teamSection.team[0]
	);
	const [isFading, setIsFading] = useState(false);
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
	const changeMainMember = (member: ITeamMember) => {
		if (member.id === mainMember.id) return;

		// начинаем фейд-аут
		setIsFading(true);

		setTimeout(() => {
			setMainMember(member);
			setIsFading(false); // запускаем фейд-ин
		}, 200); // время совпадает с transition
	};
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
				<p className="sectionContent h3">{data.teamSection.title}</p>
			</div>
			<div className={`${styles.teamSec__teamWrapp} ${styles[layout]}`}>
				<div
					className={`${styles.teamSec__mainCard} ${
						isFading ? styles.fadeOut : styles.fadeIn
					}`}
					style={{ gridArea: "main" }}
				>
					{mainMember && (
						<>
							<Image
								key={mainMember.id}
								src={process.env.NEXT_PUBLIC_URL + mainMember.image.url}
								alt={mainMember.image.alternativeText}
								width={mainMember.image.width}
								height={mainMember.image.height}
							/>
							<p className="itemTitle">{mainMember.name}</p>
							<p className={styles.teamSec__mainCardPost}>{mainMember.post}</p>
						</>
					)}
				</div>
				{data.teamSection.team.map((member, index) => {
					const area = `pos${index + 1}`;

					return (
						<div
							key={member.id}
							className={
								mainMember.id !== member.id
									? styles.teamSec__card
									: styles.teamSec__card + " " + styles.teamSec__cardColor
							}
							style={{ gridArea: area }}
							onClick={() => {
								changeMainMember(member);
							}}
							{...hoverProps}
						>
							<Image
								src={process.env.NEXT_PUBLIC_URL + member.image.url}
								alt={member.name}
								width={member.image.width}
								height={member.image.height}
							/>
						</div>
					);
				})}
			</div>
			<TeamSwiper data={data} />
		</section>
	);
};
