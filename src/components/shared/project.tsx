import { IProject } from "@/utils/api/types/project.interface";
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
		<Link {...hoverProps} href={"/" + project.Slug} className={styles.project}>
			<div className={styles.content}>
				<h3>
					<pre style={{ whiteSpace: "pre-wrap" }}>{project.FormatTitle}</pre>
				</h3>
				<div className={styles.info}>
					<p>
						<span>Город</span>
						{project.City ? project.City : "Нет данных"}
					</p>
					<p>
						<span>Площадь</span>
						{project.Square ? project.Square : "Нет данных"}
					</p>
					<p>
						<span>Год</span>
						{project.Year ? project.Year : "Нет данных"}
					</p>
				</div>
			</div>
			<div className={styles.images}>
				{project.Gallery.slice(0, 3).map((image) => {
					return (
						<Image
							placeholder="blur"
							blurDataURL={image.blurHash}
							key={image.id}
							src={process.env.NEXT_PUBLIC_URL + image.url}
							alt={image.alternativeText}
							width={image.width}
							height={image.height}
						/>
					);
				})}
			</div>
		</Link>
	);
};
