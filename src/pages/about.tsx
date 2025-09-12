import { getInfoPageService } from "@/utils/api/getInfoPageService";
import { IAboutPageData } from "@/utils/api/types/screenTypes/aboutScreen.interface";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useRef, useState } from "react";
import styles from "@/assets/styles/about.module.scss";
import Image from "next/image";
import { useCursorHover } from "@/hooks/useCursorHover";

import { HeroSection } from "@/components/about/heroSection";
import { TeamSection } from "@/components/about/teamSection";

type props = {
	data: IAboutPageData;
};

const About = ({ data }: props) => {
	const hoverProps = useCursorHover(20);
	return (
		<>
			<Head>
				<title>{data.Seo ? data.Seo.Title : "A29"}</title>
				<meta
					name="description"
					content={data.Seo ? data.Seo.Description : "Описание"}
				/>
			</Head>
			<div className="container">
				<HeroSection data={data} />
				<TeamSection data={data} />
				<section className={styles.vacancySec} id="vacancy">
					<h2 className="sectionTitle">Вакансии</h2>
					<div className={styles.vacancySec__wrapp}>
						<div className={styles.vacancySec__text}>
							{data.VacancySection
								? data.VacancySection.Vacancies.map((vacancy) => {
										return (
											<h3
												key={vacancy.id}
												className={styles.vacancySec__item + " itemTitle"}
											>
												{vacancy.Value}
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
							src={process.env.NEXT_PUBLIC_URL + data.VacancySection.Poster.url}
							width={data.VacancySection.Poster.width}
							height={data.VacancySection.Poster.height}
							alt={data.VacancySection.Poster.alternativeText}
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
	const dataAndMeta = await getInfoPageService<IAboutPageData>("about-screen", [
		"HeroSection.Principles.Author.Image",
		"HeroSection.Poster",
		"TeamSection.Team.Image",
		"VacancySection.Poster",
		"VacancySection.Vacancies",
		"Seo",
	]);

	return {
		props: { data: dataAndMeta.data },
		revalidate: 21600,
	};
};
