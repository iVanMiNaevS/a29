import { getInfoPageService } from "@/utils/api/getInfoPageService";
import { IProject } from "@/utils/api/types/project.interface";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
import styles from "@/assets/styles/oneProject.module.scss";
import { DropDownInfo } from "@/components/shared/dropDownInfo";
import Image from "next/image";
type props = {
	project: IProject;
};

import { useCursorHover } from "@/hooks/useCursorHover";
import { HaveAQuestSection } from "@/components/shared/haveAQuestSection";
import { ModalGallery } from "@/components/shared/modalGallery";

export const OneProject = ({ project }: props) => {
	const hoverProps = useCursorHover(20);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [initialSlide, setInitialSlide] = useState(0);
	return (
		<>
			<Head>
				<title>{project.FormatTitle.toString()}- А29 - Дизайн интерьера</title>
			</Head>
			<div className="container">
				<section className={styles.heroSection}>
					<h1 className="sectionTitle">Проекты</h1>
					<div className="sectionContent">
						<div className="h1">{project.FormatTitle}</div>
						<div className={styles.heroSection__characteristicsWrapp}>
							<div className={styles.info}>
								<p>
									<span>Город</span>
									<span>{project.City ? project.City : "Нет данных"}</span>
								</p>
								<p>
									<span>Площадь</span>
									<span>{project.Square ? project.Square : "Нет данных"}</span>
								</p>
								<p>
									<span>Год</span>
									<span>{project.Year ? project.Year : "Нет данных"}</span>
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className={styles.aboutSection}>
					<h2 className="h3">О проекте</h2>
					<div className={styles.aboutSection__accordions + " sectionContent"}>
						<DropDownInfo title="Задачи проекта">
							<pre>{project.Description}</pre>
						</DropDownInfo>
						<DropDownInfo notBorder title="Планировочное решение">
							<Image
								src={process.env.NEXT_PUBLIC_URL + project.Layouts[0].url}
								placeholder="blur"
								blurDataURL={project.Layouts[0].blurHash}
								alt={project.Layouts[0].alternativeText}
								width={project.Layouts[0].width}
								height={project.Layouts[0].height}
							/>
						</DropDownInfo>
					</div>
				</section>
				<section className={styles.gallerySec}>
					<h2 className="h3">Галерея</h2>
					<div className={styles.galleryWrapp}>
						{project.Gallery.map((image, index) => {
							const positionInCycle = index % 7;
							const widthClass =
								positionInCycle < 4 ? styles.item25 : styles.item33;
							return (
								<Image
									key={image.id}
									onClick={() => {
										setInitialSlide(index);
										setIsOpenModal(true);
										document.body.classList.add("notScroll");
									}}
									{...hoverProps}
									className={`${styles.galleryItem} ${widthClass}`}
									src={process.env.NEXT_PUBLIC_URL + image.url}
									alt={image.alternativeText}
									width={image.width}
									height={image.height}
									placeholder="blur"
									blurDataURL={image.blurHash}
								/>
							);
						})}
					</div>
					<ModalGallery
						initialSlide={initialSlide}
						isOpen={isOpenModal}
						onClose={() => {
							setIsOpenModal(false);
							document.body.classList.remove("notScroll");
						}}
						imgs={project.Gallery}
					/>
				</section>
				<HaveAQuestSection />
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const params = context.params as { slug: string };

	try {
		const dataAndMeta = await getInfoPageService<IProject[]>(
			"projects",
			["Layouts", "Gallery"],
			[{ filter: "$contains", field: "Slug", value: params.slug }]
		);

		if (!dataAndMeta?.data || dataAndMeta.data.length === 0) {
			return { notFound: true };
		}

		const project = dataAndMeta.data[0];

		if (!project?.Slug) {
			return { notFound: true };
		}

		return {
			props: { project },
		};
	} catch (err) {
		console.error("SSR fetch error:", err);
		return { notFound: true };
	}
};
export default OneProject;
