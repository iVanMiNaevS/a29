import { IProject } from "@/utils/api/types/project.interface";
import React, { useState } from "react";
import { Project } from "../shared/project";
import styles from "@/assets/styles/projects.module.scss";
import { useCursorHover } from "@/hooks/useCursorHover";
import { HaveAQuestSection } from "../shared/haveAQuestSection";
type props = {
	projects: IProject[];
};

export const ProjectsSection = ({ projects }: props) => {
	return (
		<section>
			{projects
				? projects.map((project) => {
						return <Project key={project.id} project={project} />;
				  })
				: "Проектов пока что нет"}
			<HaveAQuestSection />
		</section>
	);
};
