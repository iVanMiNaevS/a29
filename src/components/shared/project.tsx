import { IProject } from "@/utils/api/types/IProject";
import React from "react";
import styles from "@/assets/styles/shared/project.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useCursorHover } from "@/hooks/useCursorHover";
import { useCursorReset } from "@/hooks/useCursorReset";
type props = {
	project: IProject;
};

export const Project = ({ project }: props) => {
	useCursorReset();
	const hoverProps = useCursorHover(120, true);
	return (
		<Link {...hoverProps} href={"/" + project.slug} className={styles.project}>
			<div className={styles.content}>
				<h2 className="h3">
					<pre style={{ whiteSpace: "pre-wrap" }}>{project.formatTitle}</pre>
				</h2>
				<div className={styles.info}>
					<p>
						<span>Город</span>
						{project.city ? project.city : "Нет данных"}
					</p>
					<p>
						<span>Площадь</span>
						{project.square ? project.square : "Нет данных"}
					</p>
					<p>
						<span>Год</span>
						{project.year ? project.year : "Нет данных"}
					</p>
				</div>
			</div>
			<div className={styles.images}>
				{project.gallery.slice(0, 3).map((image) => {
					return (
						<Image
							placeholder="blur"
							blurDataURL={image.blurHash}
							key={image.id}
							src={process.env.NEXT_PUBLIC_URL + image.formats.medium.url}
							alt={
								image.alternativeText
									? image.alternativeText
									: "изображение проекта"
							}
							width={image.formats.medium.width}
							height={image.formats.medium.height}
						/>
					);
				})}
			</div>
		</Link>
	);
};
