import { IProject } from "./IProject";

export interface IReview {
	id: number;
	text: string;
	author: string;
	yandexHref: string;
	project: IProject;
}
