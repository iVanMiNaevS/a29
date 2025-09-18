import { getInfoPageService } from "@/utils/api/getInfoPageService";
import { IAboutPageData } from "@/utils/api/types/screenTypes/IAboutScreen";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useRef, useState } from "react";
import styles from "@/assets/styles/about.module.scss";
import Image from "next/image";
import { useCursorHover } from "@/hooks/useCursorHover";

import { HeroSection } from "@/components/about/heroSection";
import { TeamSection } from "@/components/about/teamSection";
import { aboutPageConverter } from "@/utils/api/converters/aboutPageConverter";

type props = {
	data: IAboutPageData;
};

const About = ({ data }: props) => {
	const hoverProps = useCursorHover(20);
	return (
		<>
			<Head>
				<title>{data.seo ? data.seo.title : "A29"}</title>
				<meta
					name="description"
					content={data.seo ? data.seo.description : "Описание"}
				/>
			</Head>
			<div className="container">
				<HeroSection data={data} />
				<TeamSection data={data} />
				<section className={styles.vacancySec} id="vacancy">
					<h2 className="sectionTitle">Вакансии</h2>
					<div className={styles.vacancySec__wrapp}>
						<div className={styles.vacancySec__text}>
							{data.vacancySection
								? data.vacancySection.vacancies.map((vacancy) => {
										return (
											<h3
												key={vacancy.id}
												className={styles.vacancySec__item + " itemTitle"}
											>
												{vacancy.value}
											</h3>
										);
								  })
								: "Вакансий нет"}
							<div
								{...hoverProps}
								className={styles.vacancySec__emailContainer}
							>
								<a
									className={styles.vacancySec__item + " itemTitle"}
									target="_blank"
									href="mailto:a29studio@yandex.ru"
								>
									a29studio@yandex.ru
								</a>
								<a
									target="_blank"
									className={styles.vacancySec__send}
									href="https://forms.yandex.ru/cloud/64f31008e010db738619c44a/"
								>
									Отправить резюме
								</a>
							</div>
						</div>
						<Image
							src={
								data.vacancySection
									? process.env.NEXT_PUBLIC_URL + data.vacancySection.poster.url
									: ""
							}
							width={
								data.vacancySection ? data.vacancySection.poster.width : 400
							}
							height={
								data.vacancySection ? data.vacancySection.poster.height : 400
							}
							alt={
								data.vacancySection
									? data.vacancySection.poster.alternativeText
									: "фото"
							}
							className={styles.vacancyImg + " sectionContent"}
						/>
					</div>
				</section>
			</div>
		</>
	);
};
export default About;

export const getStaticProps: GetStaticProps = async () => {
	const dataPage = await getInfoPageService<IAboutPageData>(
		"about-screen",
		aboutPageConverter,
		[
			"HeroSection.Principles.Author.Image",
			"HeroSection.Poster",
			"TeamSection.Team.Image",
			"VacancySection.Poster",
			"VacancySection.Vacancies",
			"Seo",
		]
	);
	return {
		props: { data: dataPage.data },
		revalidate: 21600,
	};
};
