import React, { useEffect, useState, useCallback, useRef } from "react";
import styles from "@/assets/styles/projects.module.scss";
import Head from "next/head";
import { GetStaticProps } from "next";
import { getInfoPageService } from "@/utils/api/getInfoPageService";
import { IProjectPageData } from "@/utils/api/types/screenTypes/projectScreen.interface";
import { ProjectsSection } from "@/components/projects/projectsSection";
import { IProject } from "@/utils/api/types/project.interface";
import { useCursorHover } from "@/hooks/useCursorHover";

type props = {
	data: IProjectPageData;
	dataProjects: IProject[];
};

const Projects = ({ data, dataProjects }: props) => {
	const [projects, setProjects] = useState<IProject[]>(dataProjects);
	const [activeOptions, setActiveOptions] = useState<"Жилые" | "Коммерческие">(
		"Жилые"
	);
	const [page, setPage] = useState(2);
	const [hasMore, setHasMore] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const hoverProps = useCursorHover(20);
	const observer = useRef<IntersectionObserver>(null);
	const lastProjectElementRef = useRef<HTMLDivElement>(null);

	const loadMoreProjects = useCallback(async () => {
		if (isLoading || !hasMore) return;

		setIsLoading(true);
		try {
			const dataAndMeta = await getInfoPageService<IProject[]>(
				"projects",
				["Gallery"],
				[{ filter: "$eq", field: "Type", value: activeOptions }],
				[
					{ params: "pageSize", value: 3 },
					{ params: "page", value: page },
				]
			);

			if (Array.isArray(dataAndMeta.data) && dataAndMeta.data.length > 0) {
				setProjects((prev) => [...prev, ...dataAndMeta.data]);
				setPage((prev) => prev + 1);

				const totalPages = dataAndMeta.meta.pagination?.pageCount || 0;
				if (page >= totalPages) {
					setHasMore(false);
				}
			} else {
				setHasMore(false);
			}
		} catch (error) {
			console.error("Error loading more projects:", error);
		} finally {
			setIsLoading(false);
		}
	}, [activeOptions, page, isLoading, hasMore]);

	useEffect(() => {
		if (isLoading || !hasMore) return;

		const callback = (entries: IntersectionObserverEntry[]) => {
			if (entries[0].isIntersecting) {
				loadMoreProjects();
			}
		};

		observer.current = new IntersectionObserver(callback, {
			root: null,
			rootMargin: "300px",
			threshold: 0.1,
		});

		if (lastProjectElementRef.current) {
			observer.current.observe(lastProjectElementRef.current);
		}

		return () => {
			if (observer.current) {
				observer.current.disconnect();
			}
		};
	}, [isLoading, hasMore, loadMoreProjects]);

	useEffect(() => {
		const fetchInitialProjects = async () => {
			setIsLoading(true);
			try {
				const dataAndMeta = await getInfoPageService<IProject[]>(
					"projects",
					["Gallery"],
					[{ filter: "$eq", field: "Type", value: activeOptions }],
					[{ params: "pageSize", value: 3 }]
				);

				if (Array.isArray(dataAndMeta.data) && dataAndMeta.data.length > 0) {
					setProjects(dataAndMeta.data);
					setPage(2);

					const totalPages = dataAndMeta.meta.pagination?.pageCount || 0;
					setHasMore(totalPages > 1);
				}
			} catch (error) {
				console.error("Error fetching projects:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchInitialProjects();
	}, [activeOptions]);

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

				<ProjectsSection
					projects={projects}
					lastProjectRef={lastProjectElementRef}
				/>

				{isLoading && <div className={styles.loading}>Загрузка...</div>}
			</div>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const dataAndMeta = await getInfoPageService<IProjectPageData>(
		"project-screen",
		["Seo", "Projects.Gallery"]
	);
	const dataProjects = await getInfoPageService<IProject[]>(
		"projects",
		["Gallery"],
		undefined,
		[{ params: "pageSize", value: 6 }]
	);

	return {
		props: {
			data: dataAndMeta.data,
			dataProjects: dataProjects.data,
		},
		revalidate: 21600,
	};
};

export default Projects;
