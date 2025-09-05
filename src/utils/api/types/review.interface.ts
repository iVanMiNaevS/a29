import { IProject } from "./project.interface";

export interface IReview {
	id: number;
	Text: string;
	Author: string;
	YandexHref: string;
	Project: IProject;
}
