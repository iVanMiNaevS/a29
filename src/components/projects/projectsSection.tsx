import { IProject } from "@/utils/api/types/project.interface";
import React from "react";
import { Project } from "../shared/project";
import styles from "@/assets/styles/projects.module.scss";
import { HaveAQuestSection } from "../shared/haveAQuestSection";

type props = {
	projects: IProject[];
	lastProjectRef?: React.RefObject<HTMLDivElement | null>;
};

export const ProjectsSection = ({ projects, lastProjectRef }: props) => {
	return (
		<>
			<section className={styles.projectsGrid}>
				{projects.length > 0 ? (
					projects.map((project, index) => {
						// Если это последний проект, добавляем ref для отслеживания
						const isLastProject = index === projects.length - 1;

						return (
							<div
								key={project.id}
								ref={isLastProject ? lastProjectRef : null}
								className={styles.projectItem}
							>
								<Project project={project} />
							</div>
						);
					})
				) : (
					<div>Проектов пока что нет</div>
				)}
			</section>
			<HaveAQuestSection />
		</>
	);
};
