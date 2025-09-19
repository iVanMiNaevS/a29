import {
	getInfoPageService,
	getProjects,
} from "@/utils/api/getInfoPageService";
import { IProject } from "@/utils/api/types/IProject";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
import styles from "@/assets/css/oneProject.module.scss";
import { DropDownInfo } from "@/components/shared/dropDownInfo";
import Image from "next/image";
import notImage from "@/assets/images/notImage.jpg";

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
				<title>
					{`${
						project?.formatTitle ? project.formatTitle.toString() : ""
					} - А29 - Дизайн интерьера`}
				</title>
				<meta
					name="description"
					content={project?.description ? project.description : ""}
				/>
			</Head>
			<div className="container">
				<section className={styles.heroSection}>
					<h1 className="sectionTitle">Проекты</h1>
					<div className="sectionContent">
						<div className="h1">{project.formatTitle}</div>
						<div className={styles.heroSection__characteristicsWrapp}>
							<div className={styles.info}>
								<p>
									<span>Город</span>
									<span>{project.city ? project.city : "Нет данных"}</span>
								</p>
								<p>
									<span>Площадь</span>
									<span>{project.square ? project.square : "Нет данных"}</span>
								</p>
								<p>
									<span>Год</span>
									<span>{project.year ? project.year : "Нет данных"}</span>
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className={styles.aboutSection}>
					<h2 className="h3">О проекте</h2>
					<div className={styles.aboutSection__accordions + " sectionContent"}>
						<DropDownInfo notBorder={!project.layouts} title="Задачи проекта">
							<pre>{project.description}</pre>
						</DropDownInfo>
						{project.layouts && (
							<DropDownInfo notBorder title="Планировочное решение">
								{project.layouts ? (
									<Image
										src={process.env.NEXT_PUBLIC_URL + project.layouts[0].url}
										placeholder="blur"
										blurDataURL={project.layouts[0].blurHash}
										alt={
											project.layouts[0].alternativeText
												? project.layouts[0].alternativeText
												: "Планировочное решение"
										}
										width={project.layouts[0].width}
										height={project.layouts[0].height}
									/>
								) : (
									<Image
										src={notImage}
										width={720}
										height={480}
										alt="нет фото планировки"
									/>
								)}
							</DropDownInfo>
						)}
					</div>
				</section>
				<section className={styles.gallerySec}>
					<h2 className="h3">Галерея</h2>
					<div className={styles.galleryWrapp}>
						{project.gallery.map((image, index) => {
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
									src={process.env.NEXT_PUBLIC_URL + image.formats.medium.url}
									alt={
										image.alternativeText
											? image.alternativeText
											: "фото из галлереи проекта"
									}
									width={image.formats.medium.width}
									height={image.formats.medium.height}
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
						imgs={project.gallery}
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
		const dataPage = await getProjects(
			["Layouts", "Gallery"],
			[{ filter: "$contains", field: "Slug", value: params.slug }]
		);

		if (!dataPage?.data || dataPage.data.length === 0) {
			return { notFound: true };
		}

		const project = dataPage.data[0];

		if (!project?.slug) {
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
