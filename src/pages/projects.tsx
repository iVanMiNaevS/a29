import React, { useEffect, useState } from "react";
import styles from "@/assets/styles/projects.module.scss";
import Head from "next/head";
import { GetStaticProps } from "next";
import { getInfoPageService } from "@/utils/api/getInfoPageService";
import { IProjectPageData } from "@/utils/api/types/screenTypes/projectScreen.interface";
import { ProjectsSection } from "@/components/projects/projectsSection";
import { IProject } from "@/utils/api/types/project.interface";
import { useCursorHover } from "@/hooks/useCursorHover";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/router";

type props = {
	data: IProjectPageData;
	dataProjects: IProject[];
};

const Projects = ({ data, dataProjects }: props) => {
	const [projects, setProjects] = useState(dataProjects);
	const [activeOptions, setActiveOptions] = useState<"Жилые" | "Коммерческие">(
		"Жилые"
	);
	const hoverProps = useCursorHover(20);
	useEffect(() => {
		getInfoPageService<IProject[]>(
			"projects",
			["Gallery"],
			[{ filter: "$eq", field: "Type", value: activeOptions }]
		).then((dataAndMeta) => {
			if (Array.isArray(dataAndMeta.data) && dataAndMeta.data.length > 0) {
				setProjects(dataAndMeta.data);
			}
		});
	}, [activeOptions]);
	return (
		<>
			<Head>
				<title>{data.Seo.Title}</title>
				<meta name="description" content={data.Seo.Description} />
			</Head>
			<div className="container">
				<section className={styles.heroSection}>
					<h1 className="sectionTitle">Проекты</h1>
					<div className="sectionContent h1">{data.Title}</div>
				</section>
				<section>
					<div className={styles.projects__optionsWrapp}>
						<button
							{...hoverProps}
							className={`${
								activeOptions === "Жилые" ? styles.activeOption : ""
							}`}
							onClick={() => {
								setActiveOptions("Жилые");
							}}
						>
							Жилые
						</button>
						<button
							{...hoverProps}
							className={`${
								activeOptions === "Коммерческие" ? styles.activeOption : ""
							}`}
							onClick={() => {
								setActiveOptions("Коммерческие");
							}}
						>
							Коммерческие
						</button>
					</div>
				</section>
				<ProjectsSection projects={projects} />
			</div>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const dataAndMeta = await getInfoPageService<IProjectPageData>(
		"project-screen",
		["Seo", "Projects.Gallery"]
	);
	const dataProjects = await getInfoPageService<IProjectPageData>("projects", [
		"Gallery",
	]);

	return {
		props: { data: dataAndMeta.data, dataProjects: dataProjects.data },
		revalidate: 21600,
	};
};

export default Projects;
